"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Info, Camera, Sun, History, Layers, Landmark } from "lucide-react"
import { useTheme } from "@/theme/theme"
import DefaultLayout from "@/layout/default"

function HeritageModelViewer() {
  const theme = useTheme();
  const [timeEra, setTimeEra] = useState("modern")
  const [restoration, setRestoration] = useState(50)
  const [annotations, setAnnotations] = useState(true)
  const [lighting, setLighting] = useState(100)
  const [viewMode, setViewMode] = useState("3d")
  
  // Image paths based on current settings
  const getImagePath = () => {
    // In a real app, you would have different images for each combination
    const basePath = "/assets/heritage";
    const eraPath = `${timeEra}`;
    const restorationType = restoration < 50 ? 'original' : 'restored';
    const viewType = viewMode === "xray" ? "-xray" : "";
    
    return `${basePath}/${eraPath}-${restorationType}${viewType}.jpg`;
  };

  // Adjust lighting effect on image
  const getLightingStyle = () => {
    return {
      filter: `brightness(${lighting / 100 * 1.5})`,
      transition: "filter 0.3s ease"
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-[600px]">
      {/* Image Viewer - 70% */}
      <div className="lg:col-span-7 bg-white rounded-lg shadow-md overflow-hidden relative">
        <div 
          className="w-full h-full flex items-center justify-center" 
          style={{ backgroundColor: theme.colors.background }}
        >
          <img 
            src={getImagePath()} 
            alt={`${timeEra} era artifact ${restoration < 50 ? 'original' : 'restored'} view`}
            style={{ 
              maxHeight: '100%', 
              maxWidth: '100%', 
              objectFit: 'contain',
              opacity: annotations ? 1 : 0.8,
              ...getLightingStyle()
            }}
            onError={(e) => {
              // Fallback image if the specific one doesn't exist
              e.currentTarget.src = "/assets/heritage/default-artifact.jpg";
            }}
          />
          
          {/* Annotations overlay */}
          {annotations && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
              {timeEra.charAt(0).toUpperCase() + timeEra.slice(1)} Era Artifact - {restoration < 50 ? 'Original' : 'Restored'} View
              {viewMode === "xray" && " (X-Ray Mode)"}
            </div>
          )}
          
          {/* Interactive hot spots when annotations are enabled */}
          {annotations && (
            <>
              <div className="absolute top-1/3 left-1/4 cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-primary-500 animate-pulse flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/3 cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-primary-500 animate-pulse flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control Panel - 30% */}
      <div className="lg:col-span-3">
        <Card className="h-full" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: theme.colors.primary }}>
              <Landmark className="h-5 w-5" />
              Heritage Controls
            </CardTitle>
            <CardDescription style={{ color: theme.colors.mutedText }}>Adjust settings to explore the artifact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2" style={{ color: theme.colors.text }}>
                  <History className="h-4 w-4" />
                  Time Period
                </label>
                <Select value={timeEra} onValueChange={setTimeEra}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select era" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ancient">Ancient</SelectItem>
                    <SelectItem value="medieval">Medieval</SelectItem>
                    <SelectItem value="renaissance">Renaissance</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: theme.colors.text }}>
                <Layers className="h-4 w-4" />
                Restoration Level
              </label>
              <Slider value={[restoration]} onValueChange={(value) => setRestoration(value[0])} max={100} step={1} />
              <div className="flex justify-between text-xs" style={{ color: theme.colors.mutedText }}>
                <span>Original</span>
                <span>{restoration}%</span>
                <span>Restored</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: theme.colors.text }}>
                <Info className="h-4 w-4" />
                Show Annotations
              </label>
              <Switch checked={annotations} onCheckedChange={setAnnotations} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: theme.colors.text }}>
                <Sun className="h-4 w-4" />
                Lighting
              </label>
              <Slider value={[lighting]} onValueChange={(value) => setLighting(value[0])} max={100} step={1} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: theme.colors.text }}>
                <Camera className="h-4 w-4" />
                View Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={viewMode === "3d" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("3d")}
                  style={viewMode === "3d" ? { backgroundColor: theme.colors.primary, color: theme.colors.background } : {}}
                >
                  3D View
                </Button>
                <Button
                  variant={viewMode === "xray" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("xray")}
                  style={viewMode === "xray" ? { backgroundColor: theme.colors.primary, color: theme.colors.background } : {}}
                >
                  X-Ray View
                </Button>
              </div>
            </div>

            <Button className="w-full" style={{ backgroundColor: theme.colors.primary, color: theme.colors.background }}>
              Download Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ModelsPage() {
  return (
    <DefaultLayout>
      <HeritageModelViewer />
    </DefaultLayout>
  );
}
