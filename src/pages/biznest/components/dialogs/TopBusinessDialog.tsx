import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";

interface BusinessSuggestion {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  investment: {
    initial: string;
    monthly: string;
  };
  requirements: {
    lotSize: string;
    zoning: string[];
    proximity: string[];
  };
  profitability: {
    roi: string;
    paybackPeriod: string;
    monthlyRevenue: string;
  };
  advantages: string[];
  considerations: string[];
}

interface TopBusinessDialogProps {
  topSuggestion: BusinessSuggestion;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStartPlanning?: (suggestion: BusinessSuggestion) => void;
}

const TopBusinessDialog: React.FC<TopBusinessDialogProps> = ({
  topSuggestion,
  isOpen,
  onOpenChange,
  onStartPlanning
}) => {
  const theme = useTheme();

  const handleStartPlanning = () => {
    if (onStartPlanning) {
      onStartPlanning(topSuggestion);
    }
    console.log('Starting business planning for:', topSuggestion.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button 
          className="mb-4"
          style={{ 
            backgroundColor: theme.colors.tertiary, 
            color: theme.isDark ? theme.colors.background : '#000',
            border: `2px solid ${theme.colors.primary}`
          }}
        >
          🏆 View Top Recommendation Details
        </Button>
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ 
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-xl font-bold flex items-center gap-2"
            style={{ color: theme.colors.primary }}
          >
            <span 
              className="px-2 py-1 rounded text-sm font-bold"
              style={{ 
                backgroundColor: theme.colors.tertiary, 
                color: theme.isDark ? theme.colors.background : '#000'
              }}
            >
              #1
            </span>
            {topSuggestion.name}
          </DialogTitle>
          <DialogDescription>
            <Badge 
              className="mb-2"
              style={{ 
                backgroundColor: theme.colors.secondary + '20', 
                color: theme.colors.secondary,
                border: `1px solid ${theme.colors.secondary}`
              }}
            >
              {topSuggestion.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Business Image */}
          <div 
            className="relative h-64 overflow-hidden rounded-lg"
            style={{ backgroundColor: theme.colors.mutedText + '20' }}
          >
            <img
              src={topSuggestion.image}
              alt={topSuggestion.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const fallbackImages = ['/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg'];
                const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                e.currentTarget.src = randomFallback;
              }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              style={{ 
                background: `linear-gradient(to top, ${theme.colors.background}80, transparent)`
              }}
            ></div>
          </div>

          {/* Business Description */}
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: theme.colors.card,
              border: `1px solid ${theme.colors.mutedText}30`
            }}
          >
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: theme.colors.primary }}
            >
              About This Business
            </h3>
            <p 
              className="text-base leading-relaxed"
              style={{ color: theme.colors.text }}
            >
              {topSuggestion.description}
            </p>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.primary }}
              >
                Investment & Returns
              </h3>
              <div className="space-y-3">
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.primary + '15',
                    borderColor: theme.colors.primary + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    Initial Investment
                  </h4>
                  <p style={{ color: theme.colors.text }}>
                    {topSuggestion.investment.initial}
                  </p>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.secondary + '15',
                    borderColor: theme.colors.secondary + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    Monthly Operating Cost
                  </h4>
                  <p style={{ color: theme.colors.text }}>
                    {topSuggestion.investment.monthly}
                  </p>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.tertiary + '15',
                    borderColor: theme.colors.tertiary + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    Expected Monthly Revenue
                  </h4>
                  <p style={{ color: theme.colors.text }}>
                    {topSuggestion.profitability.monthlyRevenue}
                  </p>
                </div>
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.primary + '10',
                    borderColor: theme.colors.primary + '40'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    ROI & Payback Analysis
                  </h4>
                  <div className="space-y-1">
                    <p 
                      className="text-sm"
                      style={{ color: theme.colors.text }}
                    >
                      <strong>ROI:</strong> {topSuggestion.profitability.roi}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: theme.colors.text }}
                    >
                      <strong>Payback Period:</strong> {topSuggestion.profitability.paybackPeriod}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.primary }}
              >
                Requirements & Analysis
              </h3>
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.mutedText + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    Location Requirements
                  </h4>
                  <div className="space-y-2">
                    <p className="text-sm" style={{ color: theme.colors.text }}>
                      <strong>Lot Size:</strong> {topSuggestion.requirements.lotSize}
                    </p>
                    <div className="flex flex-wrap gap-1 items-center">
                      <span 
                        className="text-sm font-medium"
                        style={{ color: theme.colors.text }}
                      >
                        Zoning:
                      </span>
                      {topSuggestion.requirements.zoning.map((zone, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs"
                          style={{
                            borderColor: theme.colors.primary,
                            color: theme.colors.primary
                          }}
                        >
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.secondary + '10',
                    borderColor: theme.colors.secondary + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    Key Advantages
                  </h4>
                  <ul 
                    className="list-disc list-inside text-sm space-y-1"
                    style={{ color: theme.colors.text }}
                  >
                    {topSuggestion.advantages.map((advantage, i) => (
                      <li key={i}>{advantage}</li>
                    ))}
                  </ul>
                </div>

                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: theme.colors.mutedText + '10',
                    borderColor: theme.colors.mutedText + '30'
                  }}
                >
                  <h4 
                    className="font-semibold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    Important Considerations
                  </h4>
                  <ul 
                    className="list-disc list-inside text-sm space-y-1"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {topSuggestion.considerations.map((consideration, i) => (
                      <li key={i}>{consideration}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className="flex justify-end gap-3 pt-4 border-t"
            style={{ borderColor: theme.colors.mutedText + '30' }}
          >
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              style={{
                borderColor: theme.colors.mutedText,
                color: theme.colors.text
              }}
            >
              Close
            </Button>
            <Button 
              onClick={handleStartPlanning}
              style={{ 
                backgroundColor: theme.colors.primary,
                color: theme.isDark ? theme.colors.background : '#fff'
              }}
            >
              Start Business Planning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopBusinessDialog;
