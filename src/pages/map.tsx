import React, { useState, useEffect, useCallback } from 'react';
import DefaultLayout from '../layout/default';
import MapPreview from './maps/map_preview';
import PolygonControls from './maps/polygon_controls';
import MapTabs, { MapType } from './maps/tabs';
import HelpDialog from './maps/dialogs/help_dialog';
import AddBiznestDialog from './maps/dialogs/add_biznest';
import ChatButton from '@/components/AIrelated/ChatButton';
import { ThemeProvider } from '../theme/theme';
import theme from '../theme/theme';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MapPage: React.FC = () => {
  const { colors } = theme;
  const navigate = useNavigate();
  // Updated coordinates to 8°58′N 125°25′E (Philippines)
  const [location/* , setLocation */] = useState({ lat: 8.97, lng: 125.42 });
  const [zoom/* , setZoom */] = useState(16); // Increased zoom level for better view of smaller polygons
  const [markers/* , setMarkers */] = useState([
    { lat: 8.97, lng: 125.42, title: 'Philippine Location (8°58′N 125°25′E)' },
  ]);
  
  // State to store predefined and user-created polygons
  const [predefinedPolygons, setPredefinedPolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
  }>>([]);
  
  const [userPolygons, setUserPolygons] = useState<Array<{
    paths: Array<{ lat: number; lng: number }>;
    options?: any;
  }>>([]);

  // Add states for biznest and flood polygons
  const [biznestPolygons, setBiznestPolygons] = useState<Array<{
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

  // Add current map type state
  const [currentMapType, setCurrentMapType] = useState<MapType>('standard');

  // Add states to track which biznest and flood polygons are visible
  const [biznestVisible, setBiznestVisible] = useState<boolean>(true);
  const [floodVisible, setFloodVisible] = useState<boolean>(true);

  // Add loading state
  const [loading, setLoading] = useState<boolean>(false);
  
  // Add dialog states
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [addBiznestDialogOpen, setAddBiznestDialogOpen] = useState<boolean>(false);
  const [selectedPolygon, setSelectedPolygon] = useState<{
    id: number;
    paths: Array<{ lat: number; lng: number }>;
  } | null>(null);

  // Create separate fetch functions for each data type
  const fetchStandardPolygons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/data/maps.json');
      if (response.data && response.data.polygons) {
        setPredefinedPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error('Error fetching polygon data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBiznestPolygons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/data/maps.json');
      if (response.data && response.data.polygons) {
        setBiznestPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error('Error fetching biznest polygon data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchFloodPolygons = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/data/flood.json');
      if (response.data && response.data.polygons) {
        setFloodPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error('Error fetching flood polygon data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStandardPolygons(),
        fetchBiznestPolygons(),
        fetchFloodPolygons()
      ]);
      setLoading(false);
    };
    
    fetchAllData();
  }, []);

  // Determine which polygons to display based on current map type and visibility toggles
  const getDisplayedPolygons = () => {
    switch (currentMapType) {
      case 'biznest':
        return biznestVisible ? biznestPolygons : [];
      case 'flood':
        return floodVisible ? floodPolygons : [];
      default:
        // Standard map shows all polygon types but respects toggles
        return [
          ...(biznestVisible ? predefinedPolygons : []), 
          ...userPolygons, 
          ...(floodVisible ? floodPolygons : [])
        ];
    }
  };

  // All polygons to display based on current selection
  const displayedPolygons = getDisplayedPolygons();

  // Handle new polygon drawn on the map
  const handleNewPolygon = (paths: Array<{ lat: number; lng: number }>) => {
    // Only allow drawing polygons in standard map mode
    if (currentMapType !== 'standard') {
      console.log('Drawing is only allowed in standard map mode');
      return;
    }
    
    // Log the polygon paths that the user draws
    console.log('User drew a new polygon with paths:', paths);
    
    const newPolygon = {
      paths,
      options: {
        fillColor: "#2ecc71",
        strokeColor: "#27ae60",
        fillOpacity: 0.3,
        strokeWeight: 2
      }
    };
    setUserPolygons([...userPolygons, newPolygon]);
    
    console.log(`Total user-drawn polygons: ${userPolygons.length + 1}`);
  };

  // Function to undo the last drawn polygon (now used for Ctrl+Z)
  const handleUndoPolygon = useCallback(() => {
    if (userPolygons.length > 0) {
      console.log('Removing last polygon (Ctrl+Z):', userPolygons[userPolygons.length - 1].paths);
      setUserPolygons(userPolygons.slice(0, -1));
    }
  }, [userPolygons]);

  // Add keyboard event listener for Ctrl+Z
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Z (or Cmd+Z on Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault(); // Prevent default browser undo
        handleUndoPolygon();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndoPolygon]);

  // Navigation handlers
  const handleSwitchToStandard = async () => {
    setCurrentMapType('standard');
    
    // Only fetch data for visible layers
    const fetchPromises = [];
    
    if (biznestVisible && predefinedPolygons.length === 0) {
      fetchPromises.push(fetchStandardPolygons());
    }
    
    if (floodVisible && floodPolygons.length === 0) {
      fetchPromises.push(fetchFloodPolygons());
    }
    
    if (fetchPromises.length > 0) {
      await Promise.all(fetchPromises);
    }
  };

  // Toggle biznest visibility with optimized fetching
  const toggleBiznestVisibility = async () => {
    if (currentMapType === 'biznest') {
      if (!biznestVisible) {
        // If turning visibility on, refetch the data
        await fetchBiznestPolygons();
        setBiznestVisible(true);
      } else {
        // If hiding, simply clear the data without fetching
        setBiznestPolygons([]);
        setBiznestVisible(false);
      }
    } else if (currentMapType === 'standard') {
      if (!biznestVisible) {
        // If turning visibility on, refetch the data
        await fetchBiznestPolygons();
        setBiznestVisible(true);
      } else {
        // If hiding, simply clear the data without fetching
        setPredefinedPolygons([]);
        setBiznestVisible(false);
      }
    } else {
      // If in flood mode, navigate to biznest page
      navigate('/maps/origin');
    }
  };

  // Toggle flood visibility with optimized fetching
  const toggleFloodVisibility = async () => {
    if (currentMapType === 'flood') {
      if (!floodVisible) {
        // If turning visibility on, refetch the data
        await fetchFloodPolygons();
        setFloodVisible(true);
      } else {
        // If hiding, simply clear the data without fetching
        setFloodPolygons([]);
        setFloodVisible(false);
      }
    } else if (currentMapType === 'standard') {
      if (!floodVisible) {
        // If turning visibility on, refetch the data
        await fetchFloodPolygons();
        setFloodVisible(true);
      } else {
        // If hiding, simply clear the data without fetching
        setFloodPolygons([]);
        setFloodVisible(false);
      }
    } else {
      // If in biznest mode, navigate to flood page
      navigate('/maps/flood');
    }
  };

  // Handle Add Biznest button click
  const handleAddBiznest = () => {
    console.log('Add Biznest button clicked');
    
    if (userPolygons.length === 0) {
      // If no polygons have been drawn, show the help dialog instead
      setHelpDialogOpen(true);
      return;
    }
    
    // Get the most recently drawn polygon
    const latestPolygon = userPolygons[userPolygons.length - 1];
    
    // Set the selected polygon for the dialog
    setSelectedPolygon({
      id: userPolygons.length,
      paths: latestPolygon.paths
    });
    
    // Open the add biznest dialog
    setAddBiznestDialogOpen(true);
  };

  // Handle Help button click
  const handleHelp = () => {
    setHelpDialogOpen(true);
  };

  // Handle dialog confirmations
  const handleAddBiznestConfirm = () => {
    // Here you would typically save the biznest data to your backend
    console.log('Biznest site confirmed for polygon:', selectedPolygon);
    
    // Close the dialog
    setAddBiznestDialogOpen(false);
    // Clear selected polygon
    setSelectedPolygon(null);
  };

  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className="mx-auto max-w-7xl w-full">
          <h1 
            className="text-3xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Map
          </h1>
          
          {/* Map Tabs with icons, Add Biznest button, and Help button */}
          <MapTabs 
            currentMapType={currentMapType}
            biznestVisible={biznestVisible}
            floodVisible={floodVisible}
            onSwitchToStandard={handleSwitchToStandard}
            onToggleBiznest={toggleBiznestVisibility}
            onToggleFlood={toggleFloodVisibility}
            onAddBiznest={handleAddBiznest}
            onHelp={handleHelp}
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
                onPolygonComplete={handleNewPolygon}
                enableDrawing={currentMapType === 'standard'} // Only enable drawing in standard mode
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
                  Loading map data...
                </div>
              </div>
            )}
          </div>
          
          {/* Map Legend */}
          <div 
            className="p-4 rounded-lg flex items-center gap-5 mt-4"
            style={{ 
              backgroundColor: colors.background,
              borderColor: colors.tertiary,
              border: '1px solid'
            }}
          >
            {currentMapType === 'standard' && (
              <>
                {biznestVisible && (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 border border-gray-300"
                      style={{ backgroundColor: "#2ecc71" }}
                    />
                    <span style={{ color: colors.text }}>
                      Biznest Sites
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
                      Flood Zones
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 border border-gray-300"
                    style={{ backgroundColor: "#2ecc71" }}
                  />
                  <span style={{ color: colors.text }}>
                    Custom Polygons
                  </span>
                </div>
              </>
            )}
            {currentMapType === 'biznest' && biznestVisible && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 border border-gray-300"
                  style={{ backgroundColor: "#2ecc71" }}
                />
                <span style={{ color: colors.text }}>
                  Biznest Sites
                </span>
              </div>
            )}
            {currentMapType === 'flood' && floodVisible && (
              <div className="flex items-center gap-2">
                <div 
                  className="w-5 h-5 border border-gray-300"
                  style={{ backgroundColor: "#ff5252" }}
                />
                <span style={{ color: colors.text }}>
                  Flood Zones
                </span>
              </div>
            )}
            {((currentMapType === 'biznest' && !biznestVisible) || 
             (currentMapType === 'flood' && !floodVisible)) && (
              <div className="flex items-center gap-2">
                <span style={{ color: colors.text }}>
                  No polygons currently visible. Click the toggle button to show them.
                </span>
              </div>
            )}
          </div>
          
          {/* Only show polygon controls in standard map view */}
          {currentMapType === 'standard' && (
            <PolygonControls 
              polygonCount={userPolygons.length} 
              isPredefinedCount={predefinedPolygons.length}
            />
          )}
          
          {/* Location info */}
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
              {currentMapType === 'standard' && (
                <>
                  Displaying {biznestVisible ? predefinedPolygons.length : 0} biznest sites, 
                  {floodVisible ? floodPolygons.length : 0} flood zones, and {userPolygons.length} user-created polygons.
                  <br />
                  Draw polygons using the drawing tools in the map. Use Ctrl+Z to undo last drawn polygon.
                </>
              )}
              {currentMapType === 'biznest' && (
                <>
                  {biznestVisible 
                    ? `Displaying ${biznestPolygons.length} biznest site polygons.` 
                    : 'Biznest site polygons are currently hidden. Click the toggle button to show them.'}
                </>
              )}
              {currentMapType === 'flood' && (
                <>
                  {floodVisible 
                    ? `Displaying ${floodPolygons.length} flood zone polygons.` 
                    : 'Flood zone polygons are currently hidden. Click the toggle button to show them.'}
                </>
              )}
            </p>
          </div>
          
          {/* Dialogs */}
          <HelpDialog 
            isOpen={helpDialogOpen} 
            onClose={() => setHelpDialogOpen(false)} 
          />
          
          <AddBiznestDialog 
            isOpen={addBiznestDialogOpen} 
            onClose={() => setAddBiznestDialogOpen(false)}
            onConfirm={handleAddBiznestConfirm}
            polygonId={selectedPolygon?.id || 0}
            polygonPaths={selectedPolygon?.paths}
          />
        </div>
        <ChatButton />
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default MapPage;
