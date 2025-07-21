import React, { useState, useEffect, useRef } from 'react';
import DefaultLayout from '../layout/default';
import MapPreview from './maps/map_preview';
import HelpDialog from './maps/dialogs/help_dialog';
import { ThemeProvider } from '../theme/theme';
import theme from '../theme/theme';
import axios from 'axios';
import MapAITabs from './map_ai/tabs_ai';
import AIPolygonCreator from './map_ai/ai_polygon';

const MapAIPage: React.FC = () => {
  const { colors } = theme;
  const mapRef = useRef<any>(null);
  
  // Map configuration
  const [location/* , setLocation */] = useState({ lat: 8.97, lng: 125.42 });
  const [zoom/* , setZoom */] = useState(16);
  const [markers/* , setMarkers */] = useState([
    { lat: 8.97, lng: 125.42, title: 'Philippine Location (8°58′N 125°25′E)' },
  ]);
  
  // Polygon states for different map types
  const [heritagePolygons, setHeritagePolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
    id?: number;
    name?: string;
  }>>([]);
  
  const [floodPolygons, setFloodPolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
    id?: number;
    name?: string;
  }>>([]);
  
  const [combinedPolygons, setCombinedPolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
    id?: number;
    name?: string;
    type?: string;
  }>>([]);

  // UI states
  const [heritageVisible/* , setHeritageVisible */] = useState<boolean>(true);
  const [floodVisible/* , setFloodVisible */] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [drawingEnabled, setDrawingEnabled] = useState<boolean>(false);
  const [drawingManager, setDrawingManager] = useState<any>(null);

  // Fetch heritage polygons from maps.json
  const fetchHeritagePolygons = async () => {
    try {
      const response = await axios.get('/data/maps.json');
      if (response.data && response.data.polygons) {
        const polygons = response.data.polygons.map((polygon: any) => ({
          ...polygon,
          type: 'heritage'
        }));
        setHeritagePolygons(polygons);
        return polygons;
      }
      return [];
    } catch (error) {
      console.error('Error fetching heritage polygon data:', error);
      return [];
    }
  };
  
  // Fetch flood polygons from flood.json
  const fetchFloodPolygons = async () => {
    try {
      const response = await axios.get('/data/flood.json');
      if (response.data && response.data.polygons) {
        const polygons = response.data.polygons.map((polygon: any) => ({
          ...polygon,
          type: 'flood'
        }));
        setFloodPolygons(polygons);
        return polygons;
      }
      return [];
    } catch (error) {
      console.error('Error fetching flood polygon data:', error);
      return [];
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [heritagePoly, floodPoly] = await Promise.all([
          fetchHeritagePolygons(),
          fetchFloodPolygons()
        ]);
        
        // Combine both types of polygons with type information
        const allPolygons = [...heritagePoly, ...floodPoly];
        setCombinedPolygons(allPolygons);
      } catch (error) {
        console.error('Error fetching map data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllData();
  }, []);

  // Determine which polygons to display based on visibility toggles
  const getDisplayedPolygons = () => {
    return combinedPolygons.filter(polygon => 
      (polygon.type === 'heritage' && heritageVisible) || 
      (polygon.type === 'flood' && floodVisible)
    );
  };

  // All polygons to display based on current selection
  const displayedPolygons = getDisplayedPolygons();

  // Handle Help button click
  const handleHelp = () => {
    setHelpDialogOpen(true);
  };

  // Start polygon drawing
  const startDrawing = () => {
    setDrawingEnabled(true);
    
    // If we have a reference to the drawing manager, activate polygon drawing mode
    if (drawingManager) {
      drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
    }
  };

  // Handle polygon creation complete
  const handlePolygonComplete = (polygon: any) => {
    // Create a new polygon object and add it to the heritage polygons
    const paths = polygon.getPath().getArray().map((point: any) => ({
      lat: point.lat(),
      lng: point.lng()
    }));
    
    const newPolygon = {
      id: Date.now(), // Use timestamp as a simple unique ID
      name: `AI Generated Polygon ${heritagePolygons.length + 1}`,
      paths,
      options: {
        fillColor: '#98D2C0',
        fillOpacity: 0.5,
        strokeColor: '#98D2C0',
        strokeWeight: 2
      },
      type: 'heritage'
    };
    
    // Add to heritage polygons
    const updatedPolygons = [...heritagePolygons, newPolygon];
    setHeritagePolygons(updatedPolygons);
    
    // Also update combined polygons
    setCombinedPolygons([...combinedPolygons, newPolygon]);
    
    // Disable drawing mode
    setDrawingEnabled(false);
    
    // Reset the drawing manager if available
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
    }
  };

  // Cancel polygon drawing
  const handleCancelDrawing = () => {
    setDrawingEnabled(false);
    
    // Reset the drawing manager if available
    if (drawingManager) {
      drawingManager.setDrawingMode(null);
    }
  };
  
  // Store reference to drawing manager when map is initialized
  const handleMapInit = (mapInstance: any, drawingMgr: any) => {
    mapRef.current = mapInstance;
    setDrawingManager(drawingMgr);
  };

  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl w-full">
          <h1 
            className="text-3xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            AI-Enhanced Map Analysis
          </h1>
          
          {/* Map Tabs with only Add Heritage and Help buttons */}
          <MapAITabs onHelp={handleHelp} />
          
          {/* AI Polygon Creator component */}
          <AIPolygonCreator 
            onPolygonComplete={handlePolygonComplete}
            onCancel={handleCancelDrawing}
            onStartDrawing={startDrawing}
            isDrawing={drawingEnabled}
          />
          
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
                polygons={displayedPolygons}
                enableDrawing={true}
                drawingOptions={{
                  fillColor: '#98D2C0',
                  fillOpacity: 0.5,
                  strokeColor: '#98D2C0',
                  strokeWeight: 2
                }}
                onPolygonComplete={handlePolygonComplete}
                onMapInit={handleMapInit}
                showDrawingTools={drawingEnabled}
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
                  Loading AI map analysis...
                </div>
              </div>
            )}
          </div>
          
          {/* AI Analysis Panel */}
          <div 
            className="p-4 rounded-lg mb-4"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
              AI Map Analysis
            </h2>
            <p style={{ color: colors.text, lineHeight: '1.5' }}>
              This view provides AI-enhanced analysis of geographic data. The map displays heritage sites and flood zones
              to help identify areas of cultural significance that may be at risk from flooding or other environmental factors.
            </p>
          </div>
          
          {/* Map Legend */}
          <div 
            className="p-4 rounded-lg flex items-center gap-5 mb-4"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            {heritageVisible && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 border border-gray-300"
                  style={{ backgroundColor: "#2ecc71" }}
                />
                <span style={{ color: colors.text }}>
                  Heritage Sites ({heritagePolygons.length})
                </span>
              </div>
            )}
            
            {floodVisible && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 border border-gray-300"
                  style={{ backgroundColor: "#ff5252" }}
                />
                <span style={{ color: colors.text }}>
                  Flood Zones ({floodPolygons.length})
                </span>
              </div>
            )}
            
            {/* Add AI Polygon Legend */}
            <div className="flex items-center gap-2">
              <div 
                className="w-5 h-5 border border-gray-300"
                style={{ backgroundColor: "#98D2C0" }}
              />
              <span style={{ color: colors.text }}>
                AI-Generated Polygons
              </span>
            </div>
          </div>
          
          {/* Location and Analysis Info */}
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            <p style={{ color: colors.text, lineHeight: '1.5' }}>
              Viewing location: 8°58′N 125°25′E (Philippines)
              <br />
              AI Analysis has identified {floodPolygons.length} flood risk zones and {heritagePolygons.length} heritage sites in this region.
              {floodPolygons.length > 0 && heritagePolygons.length > 0 && 
                " Our analysis suggests monitoring these heritage areas for potential flood impacts."}
            </p>
          </div>
          
          {/* Dialogs */}
          <HelpDialog 
            isOpen={helpDialogOpen} 
            onClose={() => setHelpDialogOpen(false)} 
          />
        </div>
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default MapAIPage;
