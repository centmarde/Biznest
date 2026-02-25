import React, { useState, useEffect, useRef } from "react";
import CoordinatesInput from "./map_ai/coordinates";
import DefaultLayout from "../layout/default";
import MapPreview from "./maps/map_preview";
import HelpDialog from "./maps/dialogs/help_dialog";
import ChatButton from "@/components/AIrelated/ChatButton";
import { ThemeProvider, useTheme } from "../theme/theme";
import axios from "axios";
import {
  fetchHeritagePolygons,
  fetchFloodPolygons,
  getDisplayedPolygons,
  handleLocationSelect,
  startDrawing,
  handlePolygonComplete,
  handleCancelDrawing,
  handleMapInit,
} from "./map_ai/helpers";
import MapAITabs from "./map_ai/tabs_ai";

const MapAIPage: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null); // Google Maps instance - external library type

  // Map configuration
  const [location, setLocation] = useState({ lat: 8.947538, lng: 125.540623 });
  const [zoom, setZoom] = useState(16);
  const [markers, setMarkers] = useState([
    {
      lat: 8.947538,
      lng: 125.540623,
      title: "Current Location (8°56′51″N 125°32′26″E)",
    },
  ]);

  // Polygon states for different map types
  const [heritagePolygons, setHeritagePolygons] = useState<
    Array<{
      paths: Array<{ lat: number; lng: number }>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any; // Google Maps polygon options - external library type
      id?: number;
      name?: string;
    }>
  >([]);

  // Removed unused floodPolygons state

  const [combinedPolygons, setCombinedPolygons] = useState<
    Array<{
      paths: Array<{ lat: number; lng: number }>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: any; // Google Maps polygon options - external library type
      id?: number;
      name?: string;
      type?: string;
    }>
  >([]);

  // UI states
  const [heritageVisible /* , setHeritageVisible */] = useState<boolean>(true);
  const [floodVisible /* , setFloodVisible */] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(true);
  const [drawingEnabled, setDrawingEnabled] = useState<boolean>(false);
  const [userDrawnPolygonCount, setUserDrawnPolygonCount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [drawingManager, setDrawingManager] = useState<any>(null); // Google Maps Drawing Manager - external library type

  // Coordinates input state
  const [coordinates, setCoordinates] = useState<
    Array<{ lat: number; lng: number }>
  >([{ lat: 8.947538, lng: 125.540623 }]);

  // ...existing code...

  // Initial data fetch on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [heritagePoly, floodPoly] = await Promise.all([
          fetchHeritagePolygons(axios, setHeritagePolygons),
          fetchFloodPolygons(axios, () => {}),
        ]);
        const allPolygons = [...heritagePoly, ...floodPoly];
        setCombinedPolygons(allPolygons);
      } catch {
        // Fallback: load data anyway if there's an error
        const [heritagePoly, floodPoly] = await Promise.all([
          fetchHeritagePolygons(axios, setHeritagePolygons),
          fetchFloodPolygons(axios, () => {}),
        ]);
        const allPolygons = [...heritagePoly, ...floodPoly];
        setCombinedPolygons(allPolygons);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // All polygons to display based on current selection
  const displayedPolygons = getDisplayedPolygons(
    combinedPolygons,
    heritageVisible,
    floodVisible
  );

  // Handle Help button click
  const handleHelp = () => {
    setHelpDialogOpen(true);
  };

  // Sync drawn polygon to coordinates input
  const handlePolygonCompleteWithInput = (
    polygon: { paths: Array<{ lat: number; lng: number }> },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heritagePolygonsArg: any[], // Array of heritage polygons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setHeritagePolygonsArg: (polygons: any[]) => void, // Heritage polygons setter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    combinedPolygonsArg: any[], // Array of combined polygons
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCombinedPolygonsArg: (polygons: any[]) => void, // Combined polygons setter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    colorsArg: any, // Theme colors object
    setDrawingEnabledArg: (enabled: boolean) => void, // Drawing enabled setter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    drawingManagerArg: any // Google Maps Drawing Manager - external library type
  ) => {
    // Update coordinates input with drawn polygon
    if (polygon?.paths?.length) {
      setCoordinates(polygon.paths);
    }
    setUserDrawnPolygonCount(prev => prev + 1);
    // Call original handler
    handlePolygonComplete(
      polygon,
      heritagePolygonsArg,
      setHeritagePolygonsArg,
      combinedPolygonsArg,
      setCombinedPolygonsArg,
      colorsArg,
      setDrawingEnabledArg,
      drawingManagerArg
    );
  };

  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className="mx-auto w-full h-screen flex flex-col">
          {/* Map Tabs with only Add Heritage and Help buttons */}
          <MapAITabs
            onHelp={handleHelp}
            drawingEnabled={drawingEnabled}
            hasDrawnPolygon={userDrawnPolygonCount > 0}
            onStartDrawing={() =>
              startDrawing(setDrawingEnabled, drawingManager)
            }
            onCancelDrawing={() =>
              handleCancelDrawing(setDrawingEnabled, drawingManager)
            }
            onUndoDrawing={() => {
              // Undo last drawn polygon (heritage)
              if (heritagePolygons.length > 0) {
                setHeritagePolygons(heritagePolygons.slice(0, -1));
                setCombinedPolygons(
                  combinedPolygons.filter(
                    (p) =>
                      p.id !== heritagePolygons[heritagePolygons.length - 1].id
                  )
                );
                setUserDrawnPolygonCount(prev => Math.max(0, prev - 1));
              }
            }}
          />

          {/* Responsive 2-Column Grid Layout (copied from map.tsx) */}
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
                    height="650px"
                    width="100%"
                    markers={markers}
                    polygons={displayedPolygons}
                    enableDrawing={true}
                    drawingOptions={{
                      fillColor: "#FFD600",
                      fillOpacity: 0.5,
                      strokeColor: "#FFD600",
                      strokeWeight: 2,
                    }}
                    onPolygonComplete={(polygon) =>
                      handlePolygonCompleteWithInput(
                        polygon,
                        heritagePolygons,
                        setHeritagePolygons,
                        combinedPolygons,
                        setCombinedPolygons,
                        colors,
                        setDrawingEnabled,
                        drawingManager
                      )
                    }
                    onMapInit={(mapInstance, drawingMgr) =>
                      handleMapInit(
                        mapRef,
                        mapInstance,
                        setDrawingManager,
                        drawingMgr
                      )
                    }
                    showDrawingTools={drawingEnabled}
                    enableSearch={true}
                    onLocationSelect={(locationData) =>
                      handleLocationSelect(
                        locationData,
                        setLocation,
                        setZoom,
                        setMarkers
                      )
                    }
                  />
                </div>
                {/* Loading Overlay */}
                {loading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                    <div
                      className="px-8 py-4 rounded shadow-md font-bold"
                      style={{
                        backgroundColor: colors.background,
                        color: colors.primary,
                      }}
                    >
                      Loading AI map analysis...
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar Column (4/12 on md+, full on mobile) */}
            <div className="md:col-span-4 col-span-1 w-full">
              {/* Coordinates Input */}
              <CoordinatesInput
                coordinates={coordinates}
                onChange={setCoordinates}
              />
            </div>
          </div>

          {/* Dialogs */}
          <HelpDialog
            isOpen={helpDialogOpen}
            onClose={() => setHelpDialogOpen(false)}
          />
        </div>
        <ChatButton />
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default MapAIPage;
