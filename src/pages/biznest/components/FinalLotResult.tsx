import { useEffect, useState } from "react";
import { useLotAnalysisStore } from "../data/memory-option-1";
import { Response, formatAIResponse } from "../lib/analyze";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/theme/theme";
import { Building2, Brain } from "lucide-react";

// AIResponseContainer component to fetch and display AI response
function AIResponseContainer() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchAIAnalysis() {
      const lotAnalysis = useLotAnalysisStore.getState();
      const prompt = `Analyze this commercial lot and provide:
1. Recommended Business Types (based on location, lot size, capital, and operating hours)
2. Points of Interest (POI) nearby
3. Zoning information and regulations

Lot Details:
- Address: ${lotAnalysis.location}
- Lot Size: ${lotAnalysis.lotSize}
- Capital: ${lotAnalysis.capital}
- Operating Hours: ${lotAnalysis.operatingHours}

Please provide detailed recommendations for the best business to establish on this lot.`;
      const { getResponse } = Response();
      const aiText = await getResponse(prompt);
      setResponse(formatAIResponse(aiText));
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div style={{ color: theme.colors.secondary }}>Address</div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.location || "N/A"}
              </div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>Lot Size</div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.lotSize || "N/A"}
              </div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>Capital</div>
              <div style={{ fontWeight: "bold", color: theme.colors.primary }}>
                {lotData.capital || "N/A"}
              </div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>
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
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>AI Analysis: Recommended Business, POI & Zoning</span>
            <Badge
              variant="outline"
              className="bg-indigo-50 text-indigo-700 border-indigo-200"
            >
              Generated by AI
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AIResponseContainer />
        </CardContent>
      </Card>
    </div>
  );
}
