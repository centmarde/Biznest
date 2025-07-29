"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "../../theme/theme"
import {
  CircleOff,
  Users,
  TrafficCone,
  Wind,
  ShieldAlert,
  TreeDeciduous,
  Home,
  Building2,
  Factory,
  Layers,
  Bus,
  Bike,
  AlertTriangle,
  Clock,
  Thermometer,
  Droplets,
  Volume2,
  UserCheck,
  DollarSign,
  Briefcase,
  MapPin,
  Hammer,
  Wrench,
  Zap,
  ShoppingBag,
  FileText,
  Camera,
  Store,
  Hospital,
  GraduationCap,
  Shield,
  Timer,
  ChevronDown,
  ChevronUp,
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
  {
    id: "zoning",
    title: "🏘️ Zoning & Land Use",
    items: [
      { type: "Residential Density", icon: Home },
      { type: "Commercial Zone Intensity", icon: Building2 },
      { type: "Industrial Activity", icon: Factory },
      { type: "Mixed-Use Development", icon: Layers },
    ],
  },
  {
    id: "transportation",
    title: "🚦 Transportation & Mobility",
    items: [
      { type: "Traffic Congestion", icon: TrafficCone },
      { type: "Public Transportation Usage", icon: Bus },
      { type: "Bike & Pedestrian Traffic", icon: Bike },
      { type: "Accident Frequency", icon: AlertTriangle },
      { type: "Commute Time Distribution", icon: Clock },
    ],
  },
  {
    id: "environment",
    title: "🌳 Environment & Sustainability",
    items: [
      { type: "Urban Heat Island Effect", icon: Thermometer },
      { type: "Green Space Accessibility", icon: TreeDeciduous },
      { type: "Air Quality Index", icon: Wind },
      { type: "Flood Risk Zones", icon: Droplets },
      { type: "Noise Pollution Intensity", icon: Volume2 },
    ],
  },
  {
    id: "demographics",
    title: "🧍 Population & Demographics",
    items: [
      { type: "Population Density", icon: Users },
      { type: "Age Group Distribution", icon: UserCheck },
      { type: "Income Level Variation", icon: DollarSign },
      { type: "Crime Rate", icon: ShieldAlert },
      { type: "Homelessness Concentration", icon: MapPin },
    ],
  },
  {
    id: "infrastructure",
    title: "🧱 Infrastructure & Development",
    items: [
      { type: "Building Permit Activity", icon: FileText },
      { type: "Construction Activity", icon: Hammer },
      { type: "Infrastructure Degradation", icon: Wrench },
      { type: "Utility Usage", icon: Zap },
    ],
  },
  {
    id: "economic",
    title: "📊 Economic Activity",
    items: [
      { type: "Retail Activity", icon: ShoppingBag },
      { type: "Business Permit Issuance", icon: Briefcase },
      { type: "Tourist Foot Traffic", icon: Camera },
      { type: "Employment Hubs", icon: Store },
    ],
  },
  {
    id: "services",
    title: "🏥 Public Services",
    items: [
      { type: "Healthcare Access", icon: Hospital },
      { type: "Education Access", icon: GraduationCap },
      { type: "Emergency Response Coverage", icon: Shield },
      { type: "Emergency Response Time", icon: Timer },
    ],
  },
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
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["zoning"])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

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
              <div key={category.id} className="border rounded-lg" style={{ borderColor: colors.primary, backgroundColor: colors.background }}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-3 flex items-center justify-between rounded-t-lg" 
                >
                  <span className="font-medium text-sm" style={{ color: colors.primary }}>{category.title}</span>
                  {expandedCategories.includes(category.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expandedCategories.includes(category.id) && (
                  <div className="p-3 pt-0 grid grid-cols-1 gap-2">
                    {category.items.map(({ type, icon: Icon }) => (
                      <div className="flex items-center justify-between gap-2">
                        <button
                          key={type}
                          onClick={() => onHeatmapChange(type)}
                          className={`p-2 rounded border flex items-center gap-2 text-sm transition-all ${
                            selectedHeatmap === type ? "border-2 shadow-sm" : "border hover:shadow-sm"
                          }`}
                          style={{
                            borderColor: selectedHeatmap === type ? colors.primary : colors.primary,
                            backgroundColor: selectedHeatmap === type ? `${colors.primary}10` : colors.background,
                            color: selectedHeatmap === type ? colors.primary : colors.primary,
                          }}
                        >
                          <Icon size={16} />
                          <span className="text-left">{type}</span>
                        </button>
                        <button
                          className="ml-2 px-2 py-1 rounded border text-xs font-medium transition-colors hover:bg-gray-100"
                          style={{
                            borderColor: colors.secondary,
                            color: colors.secondary,
                            backgroundColor: "transparent",
                          }}
                          onClick={() => alert(`Update ${type}`)}
                        >
                          Update
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
    </div>
  )
}

export default HeatmapToggler
