import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/default';
import MapPreview from './map_preview';
import { ThemeProvider, useTheme } from '../../theme/theme';
import axios from 'axios';

const FloodMap: React.FC = () => {
  const [location] = useState({ lat: 8.97, lng: 125.42 });
  const [zoom] = useState(15);
  const [markers] = useState([
    { lat: 8.97, lng: 125.42, title: 'Flood Zone Reference' },
  ]);
  
  // State to store polygon data - only flood polygons
  const [floodPolygons, setFloodPolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
    id?: number;
    name?: string;
  }>>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // Fetch only flood polygons data on component mount
  useEffect(() => {
    const fetchFloodPolygons = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/data/flood.json');
        if (response.data && response.data.polygons) {
          // Set flood-specific options
          const floodData = response.data.polygons.map((polygon: any) => ({
            ...polygon,
            options: {
              fillColor: colors.primary,
              strokeColor: colors.secondary,
              fillOpacity: 0.3,
              strokeWeight: 2
            }
          }));
          setFloodPolygons(floodData);
        }
      } catch (error) {
        console.error('Error fetching flood polygon data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFloodPolygons();
  }, []);

  const theme = useTheme();
  const { colors } = theme;

  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl w-full">
          <h1 
            className="text-3xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Flood Zone Map
          </h1>
          
          <div className="relative mb-8">
            <div 
              className="mb-8 rounded-lg overflow-hidden shadow"
              style={{ borderColor: colors.tertiary }}
            >
              <MapPreview
                center={location}
                zoom={zoom}
                height="500px"
                width="100%"
                markers={markers}
                polygons={floodPolygons}
                enableDrawing={false}
              />
            </div>
            
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                <div 
                  className="px-8 py-4 rounded shadow-md font-bold"
                  style={{ 
                    backgroundColor: colors.background,
                    color: colors.primary
                  }}
                >
                  Loading flood zone data...
                </div>
              </div>
            )}
          </div>
          
          {/* Map Legend */}
          <div 
            className="p-4 rounded-lg flex items-center gap-5"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 border border-gray-300"
                style={{ backgroundColor: colors.primary }}
              />
              <span style={{ color: colors.text }}>
                Flood Zones
              </span>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-lg mt-4"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <p style={{ color: colors.text, lineHeight: '1.5' }}>
              Viewing location: 8°58′N 125°25′E (Philippines)
              <br />
              Displaying {floodPolygons.length} flood zone polygons.
            </p>
          </div>
        </div>
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default FloodMap;
