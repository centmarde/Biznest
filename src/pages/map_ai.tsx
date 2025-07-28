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
  const mapRef = useRef<any>(null);

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
      options?: any;
      id?: number;
      name?: string;
    }>
  >([]);

  // Removed unused floodPolygons state

  const [combinedPolygons, setCombinedPolygons] = useState<
    Array<{
      paths: Array<{ lat: number; lng: number }>;
      options?: any;
      id?: number;
      name?: string;
      type?: string;
    }>
  >([]);

  // UI states
  const [heritageVisible /* , setHeritageVisible */] = useState<boolean>(true);
  const [floodVisible /* , setFloodVisible */] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [drawingEnabled, setDrawingEnabled] = useState<boolean>(false);
  const [drawingManager, setDrawingManager] = useState<any>(null);

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
      } catch (error) {
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
    heritagePolygonsArg: any,
    setHeritagePolygonsArg: any,
    combinedPolygonsArg: any,
    setCombinedPolygonsArg: any,
    colorsArg: any,
    setDrawingEnabledArg: any,
    drawingManagerArg: any
  ) => {
    // Update coordinates input with drawn polygon
    if (polygon?.paths?.length) {
      setCoordinates(polygon.paths);
    }
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
