import { useEffect, useState } from "react";
import { useLotAnalysisStore } from "../data/memory-option-1";
import { Response, formatAIResponse, analyzeLotWithLocation, LotAnalysisData } from "../lib/analyze";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/theme/theme";
import { Building2, Brain, MapPin, DollarSign, Clock } from "lucide-react";

// AIResponseContainer component to fetch and display AI response
function AIResponseContainer() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    async function fetchAIAnalysis() {
      const lotAnalysis = useLotAnalysisStore.getState();
      
      try {
        // Prepare enhanced analysis data
        const locationData = lotAnalysis.locationData ? {
          lat: lotAnalysis.locationData.lat,
          lng: lotAnalysis.locationData.lng,
          address: lotAnalysis.locationData.address,
          accuracy: 'medium' as const,
          source: 'manual' as const,
          timestamp: new Date()
        } : null;
        
        const analysisData: LotAnalysisData = {
          location: locationData,
          polygonCoordinates: lotAnalysis.polygonCoordinates,
          lotSize: lotAnalysis.lotSize,
          capital: lotAnalysis.capital,
          operatingHours: lotAnalysis.operatingHours,
        };
        
        // Use enhanced location-based analysis
        console.log("Using enhanced location-based analysis with data:", analysisData);
        const aiText = await analyzeLotWithLocation(analysisData);
        setResponse(formatAIResponse(aiText));
        
      } catch (error) {
        console.error("Enhanced analysis failed, falling back to basic:", error);
        
        // Fallback to basic analysis with Butuan context
        const prompt = `Analyze this commercial lot in Butuan City, Philippines and provide detailed business recommendations:

LOCATION: Butuan City - Regional center of Caraga Region with 372,910 population
ECONOMIC PROFILE: Trade and commerce hub, government center, agricultural trading, emerging tourism

Lot Details:
- Address: ${lotAnalysis.location}
- Lot Size: ${lotAnalysis.lotSize}
- Capital: ${lotAnalysis.capital}
- Operating Hours: ${lotAnalysis.operatingHours}

NEARBY ESTABLISHMENTS (within city center):
• Robinsons Place Butuan - Major shopping mall
• Caraga State University - 15,000+ students
• Father Saturnino Urios University - Private university
• Butuan Medical Center - Major hospital
• Butuan City Hall - Government center
• BDO Unibank, Metrobank - Banking services
• Butuan Grand Central Market - Public market
• Max's Restaurant, Jollibee - Established food chains

Please provide Butuan-specific analysis:
1. Business Types suited for Butuan market
2. Competition analysis with local establishments
3. Investment potential considering local economy
4. Risk factors specific to Mindanao/Caraga region
5. Growth opportunities in regional context`;
        
        const { getResponse } = Response();
        const aiText = await getResponse(prompt);
        setResponse(formatAIResponse(aiText));
      }
      
      setLoading(false);
    }
    fetchAIAnalysis();
  }, []);
  return (
    <div className="prose prose-slate max-w-none">
      {loading || !response ? (
        <div className="flex items-center justify-center h-32">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: response }} />
      )}
    </div>
  );
}

export function BusinessLotAnalysisResults() {
  const theme = useTheme();

  const lotData = useLotAnalysisStore.getState();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          border: "none",
          boxShadow: "0 4px 16px rgba(76, 88, 91, 0.12)",
          ...theme.components.card,
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                style={{
                  padding: "8px",
                  background: theme.colors.tertiary,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Building2
                  className="w-6 h-6"
                  style={{ color: theme.colors.primary }}
                />
              </div>
              <div>
                <CardTitle
                  style={{ ...theme.components.text.heading, fontSize: "2rem" }}
                >
                  Commercial Lot Analysis
                </CardTitle>
                <p style={{ color: theme.colors.secondary }}>
                  {lotData.location || "Your Lot Location"}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-1" style={{ color: theme.colors.secondary }}>
                <MapPin className="w-4 h-4" />
                Address
              </div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.location || "N/A"}
              </div>
              {lotData.locationData && (
                <div className="text-xs mt-1" style={{ color: theme.colors.mutedText }}>
                  {lotData.locationData.lat.toFixed(6)}, {lotData.locationData.lng.toFixed(6)}
                </div>
              )}
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>Lot Size</div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.lotSize || "N/A"}
              </div>
              {lotData.polygonCoordinates && lotData.polygonCoordinates.length > 0 && (
                <div className="text-xs mt-1" style={{ color: theme.colors.mutedText }}>
                  {lotData.polygonCoordinates.length} boundary points
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1" style={{ color: theme.colors.secondary }}>
                <DollarSign className="w-4 h-4" />
                Capital
              </div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.capital || "N/A"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1" style={{ color: theme.colors.secondary }}>
                <Clock className="w-4 h-4" />
                Operating Hours
              </div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.operatingHours || "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Only */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 flex-wrap">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>AI Business Analysis with Location Intelligence</span>
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200"
            >
              Enhanced AI Analysis
            </Badge>
            {lotData.locationData && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Location Data Available
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AIResponseContainer />
        </CardContent>
      </Card>
    </div>
  );
}
