import React, { useState } from "react";
import { useLotAnalysisStore as useGlobalLotAnalysisStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import WelcomeDialog from "@/pages/biznest/components/dialogs/WelcomeDialog";
import MapSelectionDialog from "@/pages/biznest/components/dialogs/MapSelectionDialog";
import CapitalInputDialog from "@/pages/biznest/components/dialogs/CapitalInputDialog";
import OperatingHoursDialog from "@/pages/biznest/components/dialogs/OperatingHoursDialog";
import ReviewDialog from "@/pages/biznest/components/dialogs/ReviewDialog";

type LotAnalysisInputs = {
  location: string;
  lotSize: string;
  capital: string;
  operatingHours: string;
};

const LotAnalysisForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState<Array<{ lat: number; lng: number }>>([]);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);
  const [showMapDialog, setShowMapDialog] = useState(false);
  const [showCapitalDialog, setShowCapitalDialog] = useState(false);
  const [showHoursDialog, setShowHoursDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  
  // Track dialog completion
  const [locationCompleted, setLocationCompleted] = useState(false);
  const [capitalCompleted, setCapitalCompleted] = useState(false);
  const [hoursCompleted, setHoursCompleted] = useState(false);

  // Use global Zustand store from memory-option-1.ts
  const { lotSize, capital, operatingHours, setInputs } =
    useGlobalLotAnalysisStore();

  const handleChange =
    (field: keyof LotAnalysisInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs({ [field]: e.target.value });
    };

  const handleLocationSelect = (locationData: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setSelectedLocation(locationData);
    setInputs({ location: locationData.address });
  };

  const handlePolygonComplete = (polygon: unknown) => {
    // Get polygon coordinates
    const polygonObj = polygon as { getPath: () => { getLength: () => number; getAt: (index: number) => { lat: () => number; lng: () => number } } };
    const path = polygonObj.getPath();
    const coordinates: Array<{ lat: number; lng: number }> = [];
    
    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push({
        lat: point.lat(),
        lng: point.lng()
      });
    }
    
    setPolygonCoordinates(coordinates);
    
    // Calculate polygon center for location reference
    if (window.google && window.google.maps) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach(coord => bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng)));
      const center = bounds.getCenter();
      
      // Use reverse geocoding to get address for the center point
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: center }, (results: unknown, status: unknown) => {
        const statusStr = status as string;
        const resultsArray = results as Array<{ formatted_address: string }>;
        if (statusStr === 'OK' && resultsArray && resultsArray[0]) {
          setSelectedLocation({
            lat: center.lat(),
            lng: center.lng(),
            address: resultsArray[0].formatted_address
          });
          setInputs({ location: resultsArray[0].formatted_address });
        }
      });

      // Auto-calculate lot size from polygon area
      const area = window.google.maps.geometry.spherical.computeArea(path as unknown);
      const areaInSqm = Math.round(area);
      setInputs({ lotSize: `${areaInSqm} sqm` });
    }
  };

  const handleWelcomeDialogClose = () => {
    setShowWelcomeDialog(false);
  };

  const handleGetStarted = () => {
    setShowMapDialog(true);
  };

  const handleMapDialogClose = () => {
    setShowMapDialog(false);
    // If location was selected, move to capital dialog
    if (selectedLocation || polygonCoordinates.length > 0) {
      setLocationCompleted(true);
      setShowCapitalDialog(true);
    }
  };

  const handleCapitalConfirm = (capital: string) => {
    setInputs({ capital });
    setCapitalCompleted(true);
    setShowCapitalDialog(false);
    setShowHoursDialog(true);
  };

  const handleHoursConfirm = (hours: string) => {
    setInputs({ operatingHours: hours });
    setHoursCompleted(true);
    setShowHoursDialog(false);
    setShowReviewDialog(true);
  };

  const handleReviewEdit = (section: 'location' | 'capital' | 'hours') => {
    setShowReviewDialog(false);
    switch (section) {
      case 'location':
        setShowMapDialog(true);
        break;
      case 'capital':
        setShowCapitalDialog(true);
        break;
      case 'hours':
        setShowHoursDialog(true);
        break;
    }
  };

  const handleFinalConfirm = () => {
    setShowReviewDialog(false);
    
    const submissionData = {
      location: selectedLocation,
      polygonCoordinates,
      lotSize,
      capital,
      operatingHours,
    };
    
    console.log("Final Lot Analysis Inputs:", submissionData);
    
    // Save to global Zustand store with enhanced data
    setInputs({
      location: selectedLocation?.address || "Drawn Area",
      lotSize,
      capital,
      operatingHours,
      // Store additional location data for analysis
      locationData: selectedLocation,
      polygonCoordinates,
    });
    
    navigate("/biznest/lot-analysis-result");
  };



  return (
    <DefaultLayout>
      <WelcomeDialog 
        isOpen={showWelcomeDialog} 
        onClose={handleWelcomeDialogClose}
        onGetStarted={handleGetStarted}
      />
      <MapSelectionDialog
        isOpen={showMapDialog}
        onClose={handleMapDialogClose}
        onLocationSelect={handleLocationSelect}
        onPolygonComplete={handlePolygonComplete}
        selectedLocation={selectedLocation}
        polygonCoordinates={polygonCoordinates}
      />
      <CapitalInputDialog
        isOpen={showCapitalDialog}
        onClose={() => setShowCapitalDialog(false)}
        onCapitalConfirm={handleCapitalConfirm}
        currentCapital={capital}
      />
      <OperatingHoursDialog
        isOpen={showHoursDialog}
        onClose={() => setShowHoursDialog(false)}
        onHoursConfirm={handleHoursConfirm}
        currentHours={operatingHours}
      />
      <ReviewDialog
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        onConfirm={handleFinalConfirm}
        onEdit={handleReviewEdit}
        data={{
          location: selectedLocation,
          polygonCoordinates,
          lotSize,
          capital,
          operatingHours
        }}
      />
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: theme.colors.primary }}
        >
          Analyze Your Lot
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Follow the guided steps to define your lot analysis parameters. Our AI will analyze your input to provide the best business recommendations.
        </p>
        
        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: locationCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: locationCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              locationCompleted ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {locationCompleted ? '✓' : '1'}
            </div>
            <div>
              <h3 className="font-medium" style={{ color: theme.colors.text }}>
                {locationCompleted ? 'Location Defined ✅' : 'Step 1: Define Location'}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                {locationCompleted 
                  ? selectedLocation?.address || `${polygonCoordinates.length} boundary points`
                  : 'Select your lot location and boundaries'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: capitalCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: capitalCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              capitalCompleted ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {capitalCompleted ? '✓' : '2'}
            </div>
            <div>
              <h3 className="font-medium" style={{ color: theme.colors.text }}>
                {capitalCompleted ? 'Capital Set ✅' : 'Step 2: Set Investment Capital'}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                {capitalCompleted 
                  ? `₱${parseInt(capital).toLocaleString()}`
                  : 'Define your available budget'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: hoursCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: hoursCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              hoursCompleted ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              {hoursCompleted ? '✓' : '3'}
            </div>
            <div>
              <h3 className="font-medium" style={{ color: theme.colors.text }}>
                {hoursCompleted ? 'Hours Configured ✅' : 'Step 3: Configure Operating Hours'}
              </h3>
              <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                {hoursCompleted 
                  ? operatingHours
                  : 'Set your business operating schedule'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {!locationCompleted || !capitalCompleted || !hoursCompleted ? (
            <Button
              onClick={() => setShowMapDialog(true)}
              className="px-8 py-3"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              {!locationCompleted ? "Start Setup 🚀" : "Continue Setup"}
            </Button>
          ) : (
            <Button
              onClick={() => setShowReviewDialog(true)}
              className="px-8 py-3"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              Review & Analyze 📋
            </Button>
          )}
        </div>

        {/* Additional Lot Size Input (if needed) */}
        {locationCompleted && !lotSize && (
          <div className="mt-6 p-4 rounded-lg border" style={{ borderColor: theme.colors.tertiary }}>
            <Label htmlFor="lotSize" className="mb-2 block">
              Lot Size (Optional)
            </Label>
            <p className="text-sm mb-3" style={{ color: theme.colors.mutedText }}>
              If not auto-calculated from drawing, please specify your lot size
            </p>
            <Input
              id="lotSize"
              placeholder="e.g., 500 sqm"
              value={lotSize}
              onChange={handleChange("lotSize")}
            />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default LotAnalysisForm;
