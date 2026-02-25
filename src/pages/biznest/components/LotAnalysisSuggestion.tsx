import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import { useUserChoiceStore, useLotAnalysisStore } from "../data/memory-option-1";
import { Response } from "../lib/analyze";
import TopBusinessDialog from "./dialogs/TopBusinessDialog";

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

interface BusinessData {
  businessSuggestions: BusinessSuggestion[];
  selectionCriteria: {
    lotSize: Record<string, string>;
    zoning: string[];
    budget: Record<string, string>;
    proximity: string[];
  };
}

interface LotAnalysisSuggestionProps {
  autoOpenDialog?: boolean;
}

const LotAnalysisSuggestion: React.FC<LotAnalysisSuggestionProps> = ({ 
  autoOpenDialog = false 
}) => {
  const theme = useTheme();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [selectedSuggestions, setSelectedSuggestions] = useState<BusinessSuggestion[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isTopSuggestionDialogOpen, setIsTopSuggestionDialogOpen] = useState(autoOpenDialog);
  const getUserChoice = useUserChoiceStore((state) => state.getUserChoice);

  useEffect(() => {
    // Load static data and use AI to intelligently select best matches
    const loadDataAndSelectWithAI = async () => {
      try {
        // First, load the static business data
        const response = await fetch('/data/lotAnalysisBusiness.json');
        const staticData: BusinessData = await response.json();
        setBusinessData(staticData);
        
        const lotAnalysis = useLotAnalysisStore.getState();
        
        // Create AI prompt for intelligent selection from static data
        const businessOptions = staticData.businessSuggestions.map((business, index) => 
          `${index + 1}. ${business.name} (${business.category}) - Initial: ${business.investment.initial}, ROI: ${business.profitability.roi}, Lot Size: ${business.requirements.lotSize}`
        ).join('\n');

        const prompt = `Based on this commercial lot analysis in Butuan City, Philippines, intelligently select the TOP 3 most suitable business options from the available choices:

LOCATION DETAILS:
- Address: ${lotAnalysis.location}
- Lot Size: ${lotAnalysis.lotSize}
- Available Capital: ${lotAnalysis.capital}
- Operating Hours: ${lotAnalysis.operatingHours}

CITY CONTEXT: Butuan City - Regional center of Caraga Region with 372,910 population, trade and commerce hub, government center, agricultural trading, emerging tourism.

AVAILABLE BUSINESS OPTIONS:
${businessOptions}

Please analyze each option considering:
1. Lot size compatibility with available space (${lotAnalysis.lotSize})
2. Capital requirements vs available budget (${lotAnalysis.capital})
3. Suitability for Butuan City market conditions
4. Operating hours compatibility (${lotAnalysis.operatingHours})
5. Local demographics and competition factors

Respond with ONLY the numbers of the TOP 3 most suitable businesses in order of preference (e.g., "3,7,1" for businesses 3, 7, and 1 in that order). 

Consider:
- Which businesses best match the lot size requirements
- Which investment levels align with available capital
- Which businesses would thrive in Butuan's economic environment
- Which have the best ROI potential for this specific location

Your response should be exactly 3 numbers separated by commas, nothing else.`;

        const { getResponse } = Response();
        const aiResponse = await getResponse(prompt);
        
        // Parse AI response to get selected business indices
        try {
          const selectedIndicesStr = aiResponse.trim().replace(/[^\d,]/g, '');
          const selectedIndices = selectedIndicesStr.split(',')
            .map(num => parseInt(num.trim()) - 1) // Convert to 0-based index
            .filter(index => index >= 0 && index < staticData.businessSuggestions.length)
            .slice(0, 3); // Ensure only 3 selections

          if (selectedIndices.length === 3) {
            const aiSelectedSuggestions = selectedIndices.map(index => staticData.businessSuggestions[index]);
            setSelectedSuggestions(aiSelectedSuggestions);
            console.log('AI selected businesses:', aiSelectedSuggestions.map(s => s.name));
          } else {
            throw new Error('AI did not return exactly 3 valid business indices');
          }
        } catch (parseError) {
          console.warn('Failed to parse AI selection, using intelligent fallback:', parseError);
          
          // Intelligent fallback based on lot analysis data
          const intelligentSelection = selectBusinessesIntelligently(staticData.businessSuggestions, lotAnalysis);
          setSelectedSuggestions(intelligentSelection);
        }
        
      } catch (error) {
        console.error('Error in AI business selection:', error);
        
        // Final fallback to random selection
        try {
          const fallbackResponse = await fetch('/data/lotAnalysisBusiness.json');
          const fallbackData: BusinessData = await fallbackResponse.json();
          const userChoice = getUserChoice();
          const fallbackSuggestions = generateAISuggestions(fallbackData.businessSuggestions, userChoice);
          setSelectedSuggestions(fallbackSuggestions);
        } catch (fallbackError) {
          console.error('All fallbacks failed:', fallbackError);
        }
      }
    };

    loadDataAndSelectWithAI();
  }, [getUserChoice]);

  // Auto-open dialog when suggestions are loaded and autoOpenDialog is true
  useEffect(() => {
    if (autoOpenDialog && selectedSuggestions.length > 0) {
      // Small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        setIsTopSuggestionDialogOpen(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [autoOpenDialog, selectedSuggestions]);

  // AI logic to select 3 business suggestions based on user input
  const generateAISuggestions = (
    allSuggestions: BusinessSuggestion[],
    userChoice: unknown
  ): BusinessSuggestion[] => {
    // Simple AI logic - can be enhanced with more sophisticated matching
    const suggestions = [...allSuggestions];
    
    // Log user choice for future AI enhancement
    console.log('User choice for AI matching:', userChoice);
    
    // Shuffle array for variety
    for (let i = suggestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [suggestions[i], suggestions[j]] = [suggestions[j], suggestions[i]];
    }
    
    // Return first 3 suggestions (can be enhanced with actual AI matching)
    return suggestions.slice(0, 3);
  };

  // Intelligent business selection based on lot analysis data
  const selectBusinessesIntelligently = (
    allSuggestions: BusinessSuggestion[],
    lotAnalysis: {
      location?: string;
      lotSize?: string;
      capital?: string;
      operatingHours?: string;
    }
  ): BusinessSuggestion[] => {
    const scoredBusinesses = allSuggestions.map(business => {
      let score = 0;
      
      // Score based on capital compatibility
      if (lotAnalysis.capital) {
        const capitalStr = lotAnalysis.capital.replace(/[^\d]/g, '');
        const capitalAmount = parseInt(capitalStr);
        const businessInitial = business.investment.initial.replace(/[^\d]/g, '');
        const businessAmount = parseInt(businessInitial);
        
        if (capitalAmount >= businessAmount) {
          score += 30; // High score for affordable businesses
        } else if (capitalAmount * 1.5 >= businessAmount) {
          score += 15; // Medium score for slightly expensive businesses
        }
      }
      
      // Score based on lot size compatibility
      if (lotAnalysis.lotSize) {
        const lotSizeStr = lotAnalysis.lotSize.replace(/[^\d]/g, '');
        const lotSizeNum = parseInt(lotSizeStr);
        const reqSizeStr = business.requirements.lotSize.replace(/[^\d]/g, '');
        const reqSizeNum = parseInt(reqSizeStr);
        
        if (lotSizeNum >= reqSizeNum) {
          score += 25; // Good fit for lot size
        } else if (lotSizeNum * 1.2 >= reqSizeNum) {
          score += 10; // Acceptable fit
        }
      }
      
      // Score based on business category relevance to Butuan City
      const butuanSuitableCategories = ['Retail', 'Food & Beverage', 'Service', 'Healthcare', 'Education'];
      if (butuanSuitableCategories.includes(business.category)) {
        score += 20;
      }
      
      // Score based on ROI
      const roiStr = business.profitability.roi.replace(/[^\d]/g, '');
      const roiNum = parseInt(roiStr);
      if (roiNum >= 25) {
        score += 15;
      } else if (roiNum >= 20) {
        score += 10;
      } else if (roiNum >= 15) {
        score += 5;
      }
      
      return { business, score };
    });
    
    // Sort by score and return top 3
    return scoredBusinesses
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.business);
  };

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (!businessData || selectedSuggestions.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: theme.colors.primary }}
          ></div>
          <p style={{ color: theme.colors.mutedText }}>
            Analyzing your lot data and generating personalized business suggestions...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: theme.colors.primary }}
        >
          🤖 AI-Powered Business Suggestions
        </h2>
        <p 
          className="text-lg mb-4"
          style={{ color: theme.colors.mutedText }}
        >
          Based on your lot details, here are 3 tailored business recommendations
        </p>
        
        {/* Top Recommendation Dialog */}
        {selectedSuggestions.length > 0 && (
          <TopBusinessDialog
            topSuggestion={selectedSuggestions[0]}
            isOpen={isTopSuggestionDialogOpen}
            onOpenChange={setIsTopSuggestionDialogOpen}
            onStartPlanning={(suggestion) => {
              console.log('Starting business planning for:', suggestion.name);
              // Add your planning logic here
            }}
          />
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {selectedSuggestions.map((suggestion, index) => (
          <Card
            key={suggestion.id}
            className="relative overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.mutedText + '30',
            }}
          >
            {/* Rank Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge 
                className="text-sm font-bold shadow-lg"
                style={{
                  backgroundColor: index === 0 ? theme.colors.tertiary : index === 1 ? theme.colors.secondary : theme.colors.primary,
                  color: theme.isDark ? theme.colors.background : '#000',
                  border: index === 0 ? `2px solid ${theme.colors.primary}` : 'none'
                }}
              >
                #{index + 1} Recommendation
              </Badge>
            </div>

            {/* Business Image */}
            <div 
              className="relative h-48 overflow-hidden"
              style={{ backgroundColor: theme.colors.mutedText + '20' }}
            >
              <img
                src={suggestion.image}
                alt={suggestion.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  // Fallback to a default image if the specified image fails to load
                  const fallbackImages = ['/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg'];
                  const randomFallback = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                  e.currentTarget.src = randomFallback;
                }}
                onLoad={(e) => {
                  // Ensure image loaded successfully
                  e.currentTarget.style.opacity = '1';
                }}
                style={{ opacity: 0, transition: 'opacity 0.3s' }}
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                style={{ 
                  background: `linear-gradient(to top, ${theme.colors.background}60, transparent)`
                }}
              ></div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle 
                    className="text-lg font-bold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    {suggestion.name}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className="mb-3"
                    style={{ backgroundColor: theme.colors.secondary + '20', color: theme.colors.secondary }}
                  >
                    {suggestion.category}
                  </Badge>
                  <CardDescription 
                    className="text-sm leading-relaxed"
                    style={{ color: theme.colors.text }}
                  >
                    {suggestion.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: theme.colors.primary + '10' }}
                >
                  <h4 className="font-semibold mb-1 text-xs" style={{ color: theme.colors.primary }}>
                    Investment
                  </h4>
                  <p className="text-xs" style={{ color: theme.colors.text }}>
                    {suggestion.investment.initial}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: theme.colors.secondary + '10' }}
                >
                  <h4 className="font-semibold mb-1 text-xs" style={{ color: theme.colors.primary }}>
                    Expected ROI
                  </h4>
                  <p className="text-xs" style={{ color: theme.colors.text }}>
                    {suggestion.profitability.roi}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: theme.colors.primary + '10' }}
                >
                  <h4 className="font-semibold mb-1 text-xs" style={{ color: theme.colors.primary }}>
                    Revenue/Month
                  </h4>
                  <p className="text-xs" style={{ color: theme.colors.text }}>
                    {suggestion.profitability.monthlyRevenue}
                  </p>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedCard === suggestion.id && (
                <div className="space-y-4 border-t pt-4" style={{ borderColor: theme.colors.mutedText + '30' }}>
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: theme.colors.primary }}>
                      Requirements
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-medium">Lot Size: </span>
                        <span style={{ color: theme.colors.text }}>{suggestion.requirements.lotSize}</span>
                      </div>
                      <div>
                        <span className="font-medium">Monthly Operating: </span>
                        <span style={{ color: theme.colors.text }}>{suggestion.investment.monthly}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium text-xs">Zoning: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {suggestion.requirements.zoning.map((zone, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {zone}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Advantages */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: theme.colors.primary }}>
                      Key Advantages
                    </h4>
                    <ul className="list-disc list-inside text-xs space-y-1" style={{ color: theme.colors.text }}>
                      {suggestion.advantages.slice(0, 3).map((advantage, i) => (
                        <li key={i}>{advantage}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Considerations */}
                  <div>
                    <h4 className="font-semibold mb-2 text-sm" style={{ color: theme.colors.primary }}>
                      Important Considerations
                    </h4>
                    <ul className="list-disc list-inside text-xs space-y-1" style={{ color: theme.colors.mutedText }}>
                      {suggestion.considerations.slice(0, 3).map((consideration, i) => (
                        <li key={i}>{consideration}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleExpanded(suggestion.id)}
                  className="text-xs w-full"
                  size="sm"
                >
                  {expandedCard === suggestion.id ? 'Show Less' : 'View Details'}
                </Button>
                
                {/* Special button for top recommendation */}
                {index === 0 && (
                  <Button
                    className="text-xs w-full"
                    size="sm"
                    style={{ 
                      backgroundColor: theme.colors.tertiary, 
                      color: theme.isDark ? theme.colors.background : '#000',
                      border: `1px solid ${theme.colors.primary}`
                    }}
                    onClick={() => setIsTopSuggestionDialogOpen(true)}
                  >
                    🏆 Full Analysis
                  </Button>
                )}
                
                <div className="text-xs font-medium text-center" style={{ color: theme.colors.primary }}>
                  Payback: {suggestion.profitability.paybackPeriod}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div 
        className="text-center p-4 rounded-lg mt-6"
        style={{ backgroundColor: theme.colors.secondary + '10' }}
      >
        <p className="text-sm" style={{ color: theme.colors.mutedText }}>
          💡 These suggestions are generated based on your lot specifications and market analysis. 
          Consider consulting with business experts for detailed planning.
        </p>
      </div>
    </div>
  );
};

export default LotAnalysisSuggestion;
