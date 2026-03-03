"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"
import { useState } from "react"
import { useTheme } from "../../theme/theme"
import AddHeatmapDialog from "./dialogs/add_heatmap"
import {
  CircleOff,
  Home,
  Building2,
  Factory,
  Layers,
} from "lucide-react"

interface Polygon {
  paths: Array<{ lat: number; lng: number }>
  options?: any
  id?: number
  name?: string
}

interface HeatmapTogglerProps {
  currentMapType: string
  selectedHeatmap: string
  onHeatmapChange: (heatmapType: string) => void
  userPolygons: Polygon[]
  biznestPolygons: Polygon[]
  floodPolygons: Polygon[]
  biznestVisible: boolean
  floodVisible: boolean
  location: { lat: number; lng: number }
  handleHelp: () => void
  handleUndoPolygon: () => void
}

const HEATMAP_CATEGORIES = [
  { id: "residential", title: "Residential", icon: Home },
  { id: "commercial", title: "Commercial", icon: Building2 },
  { id: "industrial", title: "Industrial", icon: Factory },
  { id: "mixed_use", title: "Mixed Use", icon: Layers },
]

const HeatmapToggler: React.FC<HeatmapTogglerProps> = ({
  selectedHeatmap,
  onHeatmapChange,
  userPolygons,
  location,
  handleHelp,
  handleUndoPolygon,
}) => {
  const { colors } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");

  const handleZoneClick = (zoneName: string) => {
    setSelectedZone(zoneName);
    setDialogOpen(true);
  };

  const handleConfirmAddZone = (action: 'add' | 'view') => {
    // Handle different actions based on user choice
    if (action === 'add') {
      onHeatmapChange(`${selectedZone} (Added)`);
    } else if (action === 'view') {
      onHeatmapChange(`${selectedZone} (Filter)`);
    }
    setDialogOpen(false);
    setSelectedZone("");
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedZone("");
  };

  return (
    <div className="md:col-span-4 col-span-1 w-full">
      <div
        className="bg-white rounded-lg shadow p-4 md:p-6 h-full max-h-[85vh] overflow-y-auto"
        style={{ borderColor: colors.tertiary, backgroundColor: colors.background }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
          Map Information
        </h3>

        {/* Map Statistics */}
        <div className="space-y-4 mb-6">
         

          <div>
            <p className="text-sm text-gray-600">Current Location</p>
            <p className="font-medium text-xs" style={{ color: colors.primary }}>
              {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        </div>

        {/* Heatmap Categories */}
        <div className="mb-6">
          <h4 className="text-md font-medium mb-3" style={{ color: colors.primary }}>
            Heatmap Layers
          </h4>

          {/* None Option */}
          <div className="mb-4">
            <button
              onClick={() => onHeatmapChange("None")}
              className={`w-full p-3 rounded-lg border flex items-center gap-3 transition-all ${
                selectedHeatmap === "None" ? "border-2 shadow-md" : "border hover:shadow-sm"
              }`}
              style={{
                borderColor: selectedHeatmap === "None" ? colors.primary : colors.tertiary,
                backgroundColor: selectedHeatmap === "None" ? `${colors.primary}10` : colors.background,
                color: selectedHeatmap === "None" ? colors.primary : colors.primary,
              }}
            >
              <CircleOff size={20} />
              <span className="font-medium">No Heatmap</span>
            </button>
          </div>

          {/* Category Sections */}
          <div className="space-y-3">
            {HEATMAP_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => handleZoneClick(category.title)}
                className={`w-full p-3 rounded-lg border flex items-center gap-3 transition-all ${
                  selectedHeatmap === category.title ? "border-2 shadow-md" : "border hover:shadow-sm"
                }`}
                style={{
                  borderColor: selectedHeatmap === category.title ? colors.primary : colors.tertiary,
                  backgroundColor: selectedHeatmap === category.title ? `${colors.primary}10` : colors.background,
                  color: selectedHeatmap === category.title ? colors.primary : colors.primary,
                }}
              >
                <category.icon size={20} />
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3" style={{ color: colors.primary }}>
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button
              onClick={handleHelp}
              className="w-full px-3 py-2 text-sm rounded border transition-colors hover:shadow-sm"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
                backgroundColor: "transparent",
              }}
            >
              📖 View Help
            </button>
            {userPolygons.length > 0 && (
              <button
                onClick={handleUndoPolygon}
                className="w-full px-3 py-2 text-sm rounded border transition-colors hover:shadow-sm"
                style={{
                  borderColor: colors.secondary,
                  color: colors.secondary,
                  backgroundColor: "transparent",
                }}
              >
                ↶ Undo Last Polygon
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add Heatmap Dialog */}
      <AddHeatmapDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAddZone}
        zoneName={selectedZone}
      />
    </div>
  )
}

export default HeatmapToggler
