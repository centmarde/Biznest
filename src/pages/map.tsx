import React, { useState, useEffect, useCallback } from "react";
import DefaultLayout from "../layout/default";
import MapPreview from "./maps/map_preview";
import MapTabs, { MapType } from "./maps/tabs";
import HelpDialog from "./maps/dialogs/help_dialog";
import AddBiznestDialog from "./maps/dialogs/add_biznest";
import ChatButton from "@/components/AIrelated/ChatButton";
import { ThemeProvider, useTheme } from "../theme/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeatmapToggler from "./maps/heatmap-toggler";
// Types
interface Marker {
  lat: number;
  lng: number;
  title: string;
}

interface Polygon {
  paths: Array<{ lat: number; lng: number }>;
  options?: any;
  id?: number;
  name?: string;
}

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

interface SelectedPolygon {
  id: number;
  paths: Array<{ lat: number; lng: number }>;
}

const MapPage: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const navigate = useNavigate();

  // Map state
  const [location, setLocation] = useState({ lat: 8.947538, lng: 125.540623 });
  const [zoom, setZoom] = useState(16);
  const [markers, setMarkers] = useState<Marker[]>([
    {
      lat: 8.947538,
      lng: 125.540623,
      title: "Current Location (8°56′51″N 125°32′26″E)",
    },
  ]);
  // Heatmap state
  const [selectedHeatmap, setSelectedHeatmap] = useState<string>("None");
  const handleHeatmapChange = (heatmapType: string) => {
    setSelectedHeatmap(heatmapType);
    // Add more logic here if needed
  };

  // Polygon states
  const [predefinedPolygons, setPredefinedPolygons] = useState<Polygon[]>([]);
  const [userPolygons, setUserPolygons] = useState<Polygon[]>([]);
  const [biznestPolygons, setBiznestPolygons] = useState<Polygon[]>([]);
  const [floodPolygons, setFloodPolygons] = useState<Polygon[]>([]);

  // UI states
  const [currentMapType, setCurrentMapType] = useState<MapType>("standard");
  const [biznestVisible, setBiznestVisible] = useState<boolean>(true);
  const [floodVisible, setFloodVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Dialog states
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [addBiznestDialogOpen, setAddBiznestDialogOpen] =
    useState<boolean>(false);
  const [selectedPolygon, setSelectedPolygon] =
    useState<SelectedPolygon | null>(null);

  // API functions
  const fetchStandardPolygons = async () => {
    try {
      const response = await axios.get("/data/maps.json");
      if (response.data?.polygons) {
        setPredefinedPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error("Error fetching polygon data:", error);
    }
  };

  const fetchBiznestPolygons = async () => {
    try {
      const response = await axios.get("/data/maps.json");
      if (response.data?.polygons) {
        setBiznestPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error("Error fetching biznest polygon data:", error);
    }
  };

  const fetchFloodPolygons = async () => {
    try {
      const response = await axios.get("/data/flood.json");
      if (response.data?.polygons) {
        setFloodPolygons(response.data.polygons);
      }
    } catch (error) {
      console.error("Error fetching flood polygon data:", error);
    }
  };

  // Effects
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchStandardPolygons(),
          fetchBiznestPolygons(),
          fetchFloodPolygons(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Keyboard shortcuts
  const handleUndoPolygon = useCallback(() => {
    if (userPolygons.length > 0) {
      console.log(
        "Removing last polygon (Ctrl+Z):",
        userPolygons[userPolygons.length - 1].paths
      );
      setUserPolygons(userPolygons.slice(0, -1));
    }
  }, [userPolygons]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        handleUndoPolygon();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleUndoPolygon]);

  // Helper functions
  const getDisplayedPolygons = (): Polygon[] => {
    switch (currentMapType) {
      case "biznest":
        return biznestVisible ? biznestPolygons : [];
      case "flood":
        return floodVisible ? floodPolygons : [];
      default:
        return [
          ...(biznestVisible ? predefinedPolygons : []),
          ...userPolygons,
          ...(floodVisible ? floodPolygons : []),
        ];
    }
  };

  // Event handlers
  const handleNewPolygon = (paths: Array<{ lat: number; lng: number }>) => {
    if (currentMapType !== "standard") {
      console.log("Drawing is only allowed in standard map mode");
      return;
    }

    const newPolygon: Polygon = {
      paths,
      options: {
        fillColor: colors.secondary,
        strokeColor: colors.primary,
        fillOpacity: 0.3,
        strokeWeight: 2,
      },
    };

    setUserPolygons((prev) => [...prev, newPolygon]);
    console.log(`Total user-drawn polygons: ${userPolygons.length + 1}`);
  };

  const handleSwitchToStandard = async () => {
    setCurrentMapType("standard");

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

  const toggleBiznestVisibility = async () => {
    if (currentMapType === "biznest") {
      if (!biznestVisible) {
        await fetchBiznestPolygons();
        setBiznestVisible(true);
      } else {
        setBiznestPolygons([]);
        setBiznestVisible(false);
      }
    } else if (currentMapType === "standard") {
      if (!biznestVisible) {
        await fetchBiznestPolygons();
        setBiznestVisible(true);
      } else {
        setPredefinedPolygons([]);
        setBiznestVisible(false);
      }
    } else {
      navigate("/maps/origin");
    }
  };

  const toggleFloodVisibility = async () => {
    if (currentMapType === "flood") {
      if (!floodVisible) {
        await fetchFloodPolygons();
        setFloodVisible(true);
      } else {
        setFloodPolygons([]);
        setFloodVisible(false);
      }
    } else if (currentMapType === "standard") {
      if (!floodVisible) {
        await fetchFloodPolygons();
        setFloodVisible(true);
      } else {
        setFloodPolygons([]);
        setFloodVisible(false);
      }
    } else {
      navigate("/maps/flood");
    }
  };

  const handleAddBiznest = () => {
    console.log("Add Biznest button clicked");

    if (userPolygons.length === 0) {
      setHelpDialogOpen(true);
      return;
    }

    const latestPolygon = userPolygons[userPolygons.length - 1];
    setSelectedPolygon({
      id: userPolygons.length,
      paths: latestPolygon.paths,
    });
    setAddBiznestDialogOpen(true);
  };

  const handleHelp = () => {
    setHelpDialogOpen(true);
  };

  const handleAddBiznestConfirm = () => {
    console.log("Biznest site confirmed for polygon:", selectedPolygon);
    setAddBiznestDialogOpen(false);
    setSelectedPolygon(null);
  };

  const handleLocationSelect = (locationData: LocationData) => {
    console.log("Location selected:", locationData);
    setLocation({ lat: locationData.lat, lng: locationData.lng });
    setZoom(16);
    setMarkers([
      {
        lat: locationData.lat,
        lng: locationData.lng,
        title: `📍 ${locationData.address}`,
      },
    ]);
  };

  const displayedPolygons = getDisplayedPolygons();

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

          {/* Map Tabs */}
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

          {/* Responsive 2-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* Map Column (8/12 on md+, full on mobile) */}
            <div className="md:col-span-8 col-span-1 w-full">
              <div className="relative">
                <div
                  className="rounded-lg overflow-hidden shadow"
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
                    enableDrawing={currentMapType === "standard"} // Only enable drawing in standard mode
                    enableSearch={true} // Enable search functionality
                    onLocationSelect={handleLocationSelect} // Handle location selection
                  />
                </div>

                {/* Loading Overlay */}
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                    <div
                      className="px-4 py-2 md:px-8 md:py-4 rounded shadow-md font-bold"
                      style={{
                        backgroundColor: colors.background,
                        color: colors.primary,
                      }}
                    >
                      Loading map data...
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar Column (4/12 on md+, full on mobile) */}
            <HeatmapToggler
              currentMapType={currentMapType}
              selectedHeatmap={selectedHeatmap}
              onHeatmapChange={handleHeatmapChange}
              userPolygons={userPolygons}
              biznestPolygons={biznestPolygons}
              floodPolygons={floodPolygons}
              biznestVisible={biznestVisible}
              floodVisible={floodVisible}
              location={location}
              handleHelp={handleHelp}
              handleUndoPolygon={handleUndoPolygon}
            />
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
