import React, { useState } from "react";
import { useBusinessIdeaStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import BusinessTypeDialog from "@/pages/biznest/components/dialogs/BusinessTypeDialog";
import CapitalInputDialog from "@/pages/biznest/components/dialogs/CapitalInputDialog";
import OperatingHoursDialog from "@/pages/biznest/components/dialogs/OperatingHoursDialog";

const BusinessIdeaForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Dialog states
  const [showBusinessTypeDialog, setShowBusinessTypeDialog] = useState(false);
  const [showCapitalDialog, setShowCapitalDialog] = useState(false);
  const [showHoursDialog, setShowHoursDialog] = useState(false);
  
  // Track dialog completion
  const [businessTypeCompleted, setBusinessTypeCompleted] = useState(false);
  const [capitalCompleted, setCapitalCompleted] = useState(false);
  const [hoursCompleted, setHoursCompleted] = useState(false);

  // Use global Zustand store
  const { businessType, capital, operatingHours, setInputs } =
    useBusinessIdeaStore();

  const handleGetStarted = () => {
    setShowBusinessTypeDialog(true);
  };

  const handleBusinessTypeConfirm = (businessType: string) => {
    setInputs({ businessType });
    setBusinessTypeCompleted(true);
    setShowBusinessTypeDialog(false);
    setShowCapitalDialog(true);
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
  };

  const handleFinalSubmit = () => {
    console.log("Business Idea Inputs:", {
      businessType,
      capital,
      operatingHours,
    });
    
    // Save to global Zustand store
    setInputs({
      businessType,
      capital,
      operatingHours,
    });
    
    navigate("/biznest/business-idea-result");
  };

  const handleEditStep = (step: 'businessType' | 'capital' | 'hours') => {
    switch (step) {
      case 'businessType':
        setShowBusinessTypeDialog(true);
        break;
      case 'capital':
        setShowCapitalDialog(true);
        break;
      case 'hours':
        setShowHoursDialog(true);
        break;
    }
  };

  return (
    <DefaultLayout>
      {/* Dialog Components */}
      <BusinessTypeDialog
        isOpen={showBusinessTypeDialog}
        onClose={() => setShowBusinessTypeDialog(false)}
        onBusinessTypeConfirm={handleBusinessTypeConfirm}
        currentBusinessType={businessType}
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
      
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: theme.colors.primary }}
        >
          Find the Perfect Location
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Tell us about your business idea, and we'll help you find the ideal location. Follow the guided steps to define your business requirements.
        </p>
        
        {/* Progress Steps */}
        <div className="space-y-4 mb-8">
          {/* Step 1: Business Type */}
          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: businessTypeCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: businessTypeCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              businessTypeCompleted ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              {businessTypeCompleted ? '✓' : '1'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                Business Type
              </h3>
              <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                {businessTypeCompleted ? businessType : 'Define what type of business you want to start'}
              </p>
            </div>
            {businessTypeCompleted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditStep('businessType')}
                style={{ borderColor: theme.colors.tertiary, color: theme.colors.text }}
              >
                Edit
              </Button>
            )}
          </div>

          {/* Step 2: Capital */}
          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: capitalCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: capitalCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              capitalCompleted ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              {capitalCompleted ? '✓' : '2'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                Investment Capital
              </h3>
              <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                {capitalCompleted ? `₱${parseInt(capital).toLocaleString()}` : 'Set your available investment budget'}
              </p>
            </div>
            {capitalCompleted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditStep('capital')}
                style={{ borderColor: theme.colors.tertiary, color: theme.colors.text }}
              >
                Edit
              </Button>
            )}
          </div>

          {/* Step 3: Operating Hours */}
          <div className="flex items-center gap-4 p-4 rounded-lg border" 
               style={{ 
                 borderColor: hoursCompleted ? theme.colors.primary : theme.colors.tertiary,
                 backgroundColor: hoursCompleted ? `${theme.colors.primary}10` : theme.colors.background
               }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              hoursCompleted ? 'bg-green-500' : 'bg-gray-400'
            }`}>
              {hoursCompleted ? '✓' : '3'}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
                Operating Hours
              </h3>
              <p className="text-xs" style={{ color: theme.colors.mutedText }}>
                {hoursCompleted ? operatingHours : 'Define when your business will operate'}
              </p>
            </div>
            {hoursCompleted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditStep('hours')}
                style={{ borderColor: theme.colors.tertiary, color: theme.colors.text }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!businessTypeCompleted ? (
            <Button
              onClick={handleGetStarted}
              size="lg"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              🚀 Get Started
            </Button>
          ) : businessTypeCompleted && capitalCompleted && hoursCompleted ? (
            <Button
              onClick={handleFinalSubmit}
              size="lg"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
              }}
            >
              🔍 Find Perfect Locations
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-sm mb-4" style={{ color: theme.colors.mutedText }}>
                Complete the steps above to proceed
              </p>
              <Button
                variant="outline"
                onClick={handleGetStarted}
                style={{ borderColor: theme.colors.tertiary, color: theme.colors.text }}
              >
                Continue Setup
              </Button>
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="mt-8 p-6 rounded-lg border" style={{ 
          borderColor: theme.colors.tertiary, 
          backgroundColor: theme.colors.card 
        }}>
          <h3 className="font-semibold text-lg mb-3" style={{ color: theme.colors.primary }}>
            💡 How It Works
          </h3>
          <div className="space-y-2 text-sm" style={{ color: theme.colors.mutedText }}>
            <p>• <strong>Step 1:</strong> Tell us what type of business you want to start</p>
            <p>• <strong>Step 2:</strong> Set your investment capital and budget range</p>
            <p>• <strong>Step 3:</strong> Define your preferred operating hours and schedule</p>
            <p>• <strong>Results:</strong> Get AI-powered location recommendations tailored to your business</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaForm;
