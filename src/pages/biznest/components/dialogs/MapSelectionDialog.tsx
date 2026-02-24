import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import MapPreview from "@/pages/maps/map_preview";

interface MapSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onPolygonComplete?: (polygon: unknown) => void;
  selectedLocation?: { lat: number; lng: number; address: string } | null;
  polygonCoordinates?: Array<{ lat: number; lng: number }>;
}

const MapSelectionDialog: React.FC<MapSelectionDialogProps> = ({ 
  isOpen, 
  onClose, 
  onLocationSelect,
  onPolygonComplete,
  selectedLocation,
  polygonCoordinates = []
}) => {
  const theme = useTheme();
  const [showDrawingTools, setShowDrawingTools] = useState(false);
  const [existingPolygons, setExistingPolygons] = useState<Array<{ 
    paths: Array<{ lat: number; lng: number }>; 
    options?: {
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    } 
  }>>([]);

  // User's live location state
  const [currentLocation, setCurrentLocation] = useState({ lat: 8.948145, lng: 125.541276 });
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's live location
  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      setLocationError(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn('Error getting location:', error);
          setLocationError('Unable to get your location. Using default location.');
          // Keep default location (Philippines)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, [isOpen]);

  // Load existing polygons from maps.json
  useEffect(() => {
    if (isOpen) {
      fetch('/data/maps.json')
        .then(response => response.json())
        .then(data => {
          if (data.polygons) {
            setExistingPolygons(data.polygons.slice(0, 3)); // Show first 3 polygons as reference
          }
        })
        .catch(error => console.error('Error loading maps data:', error));
    }
  }, [isOpen]);

  const toggleDrawingMode = () => {
    setShowDrawingTools(!showDrawingTools);
  };

  const handleClearDrawing = () => {
    if (onLocationSelect) {
      onLocationSelect({ lat: 0, lng: 0, address: "" });
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(newLocation);
          
          // Use reverse geocoding to get address
          if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newLocation }, (results: unknown, status: unknown) => {
              const statusStr = status as string;
              const resultsArray = results as Array<{ formatted_address: string }>;
              if (statusStr === 'OK' && resultsArray && resultsArray[0] && onLocationSelect) {
                onLocationSelect({
                  lat: newLocation.lat,
                  lng: newLocation.lng,
                  address: resultsArray[0].formatted_address
                });
              }
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please check your location settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleConfirmSelection = () => {
    if (selectedLocation || polygonCoordinates.length > 0) {
      onClose();
    } else {
      alert("Please select a location on the map or draw your lot boundaries");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.tertiary,
          color: theme.colors.text
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-xl font-bold mb-2"
            style={{ color: theme.colors.primary }}
          >
            Define Your Lot Location 🗺️
          </DialogTitle>
          <DialogDescription 
            className="text-sm mb-4"
            style={{ color: theme.colors.mutedText }}
          >
            Search for a location or draw the exact boundaries of your lot on the map. Green polygons show existing available lots for reference.
            {locationError && (
              <div className="mt-2 p-2 rounded bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs">
                📍 {locationError}
              </div>
            )}
            {!locationError && (
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                📍 Using your current location
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drawing Controls */}
          <div className="flex gap-3 flex-wrap">
            <Button
              type="button"
              onClick={handleUseMyLocation}
              variant="outline"
              className="text-sm"
              style={{
                borderColor: theme.colors.primary,
                color: theme.colors.primary
              }}
            >
              📍 Use My Location
            </Button>
            <Button
              type="button"
              onClick={toggleDrawingMode}
              variant="outline"
              className="text-sm"
              style={{
                backgroundColor: showDrawingTools ? theme.colors.primary : theme.colors.background,
                color: showDrawingTools ? (theme.isDark ? theme.colors.background : theme.colors.text) : theme.colors.text,
                borderColor: theme.colors.tertiary
              }}
            >
              {showDrawingTools ? "Stop Drawing" : "Draw Lot Boundaries"}
            </Button>
            {polygonCoordinates.length > 0 && (
              <Button
                type="button"
                onClick={handleClearDrawing}
                variant="outline"
                className="text-sm"
                style={{
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.mutedText
                }}
              >
                Clear Drawing
              </Button>
            )}
          </div>

          {/* Location Info Display */}
          {selectedLocation && (
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.tertiary 
            }}>
              <p className="text-sm font-medium">Selected Location:</p>
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                {selectedLocation.address}
              </p>
            </div>
          )}

          {/* Polygon Info Display */}
          {polygonCoordinates.length > 0 && (
            <div className="p-3 rounded-md border" style={{ 
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.tertiary 
            }}>
              <p className="text-sm font-medium">Drawn Area:</p>
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                {polygonCoordinates.length} coordinates defined
              </p>
              <p className="text-sm mt-1" style={{ color: theme.colors.mutedText }}>
                Center: {polygonCoordinates[0] ? `${polygonCoordinates[0].lat.toFixed(6)}, ${polygonCoordinates[0].lng.toFixed(6)}` : 'N/A'}
              </p>
            </div>
          )}
          
          {/* Map Container */}
          <div className="rounded-lg border" style={{ borderColor: theme.colors.tertiary }}>
            <MapPreview
              center={currentLocation}
              zoom={18}
              height="500px"
              width="100%"
              enableSearch={true}
              enableDrawing={true}
              showDrawingTools={showDrawingTools}
              onLocationSelect={onLocationSelect}
              onPolygonComplete={onPolygonComplete}
              polygons={existingPolygons}
              markers={selectedLocation ? [{ 
                lat: selectedLocation.lat, 
                lng: selectedLocation.lng, 
                title: "Selected Location" 
              }] : []}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              style={{
                borderColor: theme.colors.tertiary,
                color: theme.colors.mutedText
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSelection}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapSelectionDialog;
