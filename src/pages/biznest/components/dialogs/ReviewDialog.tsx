import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onEdit: (section: 'location' | 'capital' | 'hours') => void;
  data: {
    location?: {
      address: string;
      lat: number;
      lng: number;
    } | null;
    polygonCoordinates?: Array<{ lat: number; lng: number }>;
    lotSize?: string;
    capital?: string;
    operatingHours?: string;
  };
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onEdit,
  data 
}) => {
  const theme = useTheme();

  const formatCurrency = (amount: string) => {
    if (!amount) return "Not set";
    const num = parseInt(amount);
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(num);
  };

  // Check if location is available (either through address or polygon coordinates)
  const hasLocation = (data.location && data.location.address) || (data.polygonCoordinates && data.polygonCoordinates.length > 0);
  const isComplete = hasLocation && data.capital && data.operatingHours;

  // Debug logging to help identify the issue
  console.log('ReviewDialog Debug:', {
    hasLocation,
    location: data.location,
    polygonCoordinates: data.polygonCoordinates,
    capital: data.capital,
    operatingHours: data.operatingHours,
    isComplete
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
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
            Review Your Lot Analysis Details 📋
          </DialogTitle>
          <DialogDescription 
            className="text-sm mb-4"
            style={{ color: theme.colors.mutedText }}
          >
            Please review all the information below. You can edit any section or proceed with the analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Location Section */}
          <div className="border rounded-lg p-4" style={{ borderColor: theme.colors.tertiary }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2" style={{ color: theme.colors.text }}>
                🗺️ Location & Lot Details
              </h3>
              <Button
                onClick={() => onEdit('location')}
                variant="outline"
                size="sm"
                style={{
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.primary
                }}
              >
                Edit
              </Button>
            </div>
            
            {(data.location && data.location.address) || (data.polygonCoordinates && data.polygonCoordinates.length > 0) ? (
              <div className="space-y-2">
                {data.location && data.location.address && (
                  <div>
                    <p className="text-sm font-medium">Address:</p>
                    <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                      {data.location.address}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {data.location && (
                    <div>
                      <p className="text-sm font-medium">Coordinates:</p>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        {data.location.lat.toFixed(6)}, {data.location.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                  {data.lotSize && (
                    <div>
                      <p className="text-sm font-medium">Lot Size:</p>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        {data.lotSize}
                      </p>
                    </div>
                  )}
                </div>
                {data.polygonCoordinates && data.polygonCoordinates.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Drawn Area:</p>
                    <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                      {data.polygonCoordinates.length} boundary points defined
                      {data.polygonCoordinates[0] && (
                        <span className="ml-2">
                          (Center: {data.polygonCoordinates[0].lat.toFixed(4)}, {data.polygonCoordinates[0].lng.toFixed(4)})
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <span>⚠️</span>
                <p className="text-sm">Location not selected</p>
              </div>
            )}
          </div>

          {/* Capital Section */}
          <div className="border rounded-lg p-4" style={{ borderColor: theme.colors.tertiary }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2" style={{ color: theme.colors.text }}>
                💰 Investment Capital
              </h3>
              <Button
                onClick={() => onEdit('capital')}
                variant="outline"
                size="sm"
                style={{
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.primary
                }}
              >
                Edit
              </Button>
            </div>
            
            {data.capital ? (
              <div>
                <p className="text-lg font-semibold" style={{ color: theme.colors.primary }}>
                  {formatCurrency(data.capital)}
                </p>
                <p className="text-sm mt-1" style={{ color: theme.colors.mutedText }}>
                  Available investment budget
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <span>⚠️</span>
                <p className="text-sm">Capital amount not set</p>
              </div>
            )}
          </div>

          {/* Operating Hours Section */}
          <div className="border rounded-lg p-4" style={{ borderColor: theme.colors.tertiary }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2" style={{ color: theme.colors.text }}>
                ⏰ Operating Hours
              </h3>
              <Button
                onClick={() => onEdit('hours')}
                variant="outline"
                size="sm"
                style={{
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.primary
                }}
              >
                Edit
              </Button>
            </div>
            
            {data.operatingHours ? (
              <div>
                <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
                  {data.operatingHours}
                </p>
                <p className="text-sm mt-1" style={{ color: theme.colors.mutedText }}>
                  Business operating schedule
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <span>⚠️</span>
                <p className="text-sm">Operating hours not set</p>
              </div>
            )}
          </div>

          {/* Completion Status */}
          {!isComplete && (
            <div 
              className="border rounded-lg p-4 bg-orange-50 dark:bg-orange-900/20" 
              style={{ borderColor: '#F59E0B' }}
            >
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <span>⚠️</span>
                <p className="text-sm font-medium">
                  Please complete all sections before proceeding with the analysis.
                </p>
              </div>
            </div>
          )}

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
              onClick={onConfirm}
              disabled={!isComplete}
              style={{
                backgroundColor: isComplete ? theme.colors.primary : theme.colors.mutedText,
                color: theme.isDark ? theme.colors.background : theme.colors.text,
                opacity: isComplete ? 1 : 0.6,
                cursor: isComplete ? 'pointer' : 'not-allowed'
              }}
            >
              Start Analysis 🚀
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
