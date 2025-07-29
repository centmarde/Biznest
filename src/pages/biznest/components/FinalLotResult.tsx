// AIResponseContainer component to fetch and display AI response
function AIResponseContainer() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchAIAnalysis() {
      const lotAnalysis = useLotAnalysisStore.getState();
      const businessStepper = useBusinessStepperStore.getState();
      const prompt = `Suggest business strategy and recommendations based on the following:\nLot Analysis: ${JSON.stringify(lotAnalysis)}\nBusiness Info: ${JSON.stringify(businessStepper)}`;
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
          <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: response }} />
      )}
    </div>
  );
}
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  useLotAnalysisStore,
  useBusinessStepperStore,
} from "../data/memory-option-1";
import { Response, formatAIResponse } from "../lib/analyze";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  TrendingUp,
  Building2,
  Users,
  Car,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  BarChart3,
  DollarSign,
  Calendar,
  Store,
  Target,
  Truck,
  Wifi,
  Shield,
} from "lucide-react";

interface AnalysisScore {
  category: string;
  score: number;
  status: "excellent" | "good" | "fair" | "poor";
  icon: React.ReactNode;
  details: string[];
}

interface Recommendation {
  type: "opportunity" | "warning" | "neutral";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
}

export function BusinessLotAnalysisResults() {
  const [selectedTab, setSelectedTab] = useState("ai-analysis");
  const theme = useTheme();
  // Removed aiAnalysisResponse state, using AIResponseContainer instead

  const lotData = {
    address: "2847 Commerce Boulevard, Downtown Business District",
    lotSize: "1.2 acres",
    zoning: "C-2 Commercial",
    listingPrice: "$1,250,000",
    estimatedValue: "$1,180,000 - $1,420,000",
    analysisDate: "January 15, 2024",
  };

  const overallScore = 84;

  // Removed useEffect for AI response, handled in AIResponseContainer

  const analysisScores: AnalysisScore[] = [
    {
      category: "Location & Visibility",
      score: 91,
      status: "excellent",
      icon: <MapPin className="w-5 h-5" />,
      details: [
        "Prime corner location with dual street frontage",
        "High visibility from major thoroughfare (45K+ daily traffic)",
        "Located in established business district",
        "Easy access from multiple directions",
      ],
    },
    {
      category: "Demographics & Market",
      score: 87,
      status: "excellent",
      icon: <Target className="w-5 h-5" />,
      details: [
        "Strong local demographics ($78K median household income)",
        "Growing population density (+8% over 5 years)",
        "High consumer spending patterns in area",
        "Diverse age groups with strong purchasing power",
      ],
    },
    {
      category: "Competition Analysis",
      score: 76,
      status: "good",
      icon: <Store className="w-5 h-5" />,
      details: [
        "Moderate competition with differentiation opportunities",
        "No direct competitors within 0.5-mile radius",
        "Complementary businesses nearby drive foot traffic",
        "Market gap identified for specific business types",
      ],
    },
    {
      category: "Accessibility & Parking",
      score: 89,
      status: "excellent",
      icon: <Car className="w-5 h-5" />,
      details: [
        "Ample parking space for 120+ vehicles",
        "ADA compliant access points available",
        "Public transportation stop within 200 yards",
        "Delivery truck access with loading zones",
      ],
    },
    {
      category: "Infrastructure & Utilities",
      score: 85,
      status: "excellent",
      icon: <Wifi className="w-5 h-5" />,
      details: [
        "High-speed fiber internet and 5G coverage",
        "All commercial utilities readily available",
        "Adequate electrical capacity for large operations",
        "Modern water and sewer infrastructure",
      ],
    },
    {
      category: "Regulatory & Compliance",
      score: 82,
      status: "good",
      icon: <Shield className="w-5 h-5" />,
      details: [
        "C-2 zoning allows wide range of commercial uses",
        "No significant regulatory restrictions",
        "Streamlined permitting process in this district",
        "Compliance with current building codes",
      ],
    },
  ];

  const recommendations: Recommendation[] = [
    {
      type: "opportunity",
      title: "Retail Anchor Opportunity",
      description:
        "Consider developing as an anchor retail location. Market analysis shows strong demand for mid-size retail (15,000-25,000 sq ft) in this area.",
      impact: "high",
    },
    {
      type: "opportunity",
      title: "Mixed-Use Development Potential",
      description:
        "Zoning allows for mixed-use development. Ground floor retail with office space above could maximize ROI by 35-40%.",
      impact: "high",
    },
    {
      type: "warning",
      title: "Construction Timeline Considerations",
      description:
        "Planned road improvements starting Q3 2024 may impact accessibility during 8-month construction period. Plan accordingly.",
      impact: "medium",
    },
    {
      type: "opportunity",
      title: "Drive-Through Configuration",
      description:
        "Lot configuration ideal for drive-through businesses. Fast-casual dining or banking services could capitalize on high traffic volume.",
      impact: "medium",
    },
    {
      type: "neutral",
      title: "Signage Optimization",
      description:
        "Invest in premium signage package. High visibility location justifies $50K-75K investment for maximum brand exposure.",
      impact: "low",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return theme.colors.primary;
    if (score >= 70) return theme.colors.secondary;
    if (score >= 55) return theme.colors.tertiary;
    return '#e11d48'; // red-600
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return theme.colors.tertiary;
    if (score >= 70) return theme.colors.secondary;
    if (score >= 55) return '#fbbf24'; // amber-100
    return '#fee2e2'; // red-100
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <CheckCircle className="w-5 h-5" style={{ color: theme.colors.primary }} />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" style={{ color: theme.colors.tertiary }} />;
      default:
        return <XCircle className="w-5 h-5" style={{ color: theme.colors.mutedText }} />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: { background: '#fee2e2', color: '#b91c1c' },
      medium: { background: '#fbbf24', color: theme.colors.tertiary },
      low: { background: theme.colors.tertiary, color: theme.colors.mutedText },
    };
    return variants[impact as keyof typeof variants] || variants.low;
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        border: 'none',
        boxShadow: '0 4px 16px rgba(76, 88, 91, 0.12)',
        ...theme.components.card,
      }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div style={{
                padding: '8px',
                background: theme.colors.tertiary,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Building2 className="w-6 h-6" style={{ color: theme.colors.primary }} />
              </div>
              <div>
                <CardTitle style={{ ...theme.components.text.heading, fontSize: '2rem' }}>
                  Commercial Lot Analysis
                </CardTitle>
                <p style={{ color: theme.colors.secondary }}>{lotData.address}</p>
              </div>
            </div>
            <div className="text-right">
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.primary }}>{overallScore}</div>
              <div style={{ fontSize: '0.9rem', color: theme.colors.mutedText }}>
                Business Viability Score
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div style={{ color: theme.colors.secondary }}>Lot Size</div>
              <div style={{ fontWeight: 'bold', color: theme.colors.primary }}>{lotData.lotSize}</div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>Zoning</div>
              <div style={{ fontWeight: 'bold', color: theme.colors.primary }}>{lotData.zoning}</div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>List Price</div>
              <div style={{ fontWeight: 'bold', color: theme.colors.primary }}>{lotData.listingPrice}</div>
            </div>
            <div>
              <div style={{ color: theme.colors.secondary }}>Est. Value</div>
              <div style={{ fontWeight: 'bold', color: theme.colors.primary }}>{lotData.estimatedValue}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="detailed">Detailed Scores</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
      </TabsList>

        <TabsContent value="ai-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span>AI-Powered Market Analysis</span>
                <Badge
                  variant="outline"
                  className="bg-indigo-50 text-indigo-700 border-indigo-200"
                >
                  Generated by AI
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Directly use getResponse for AI response */}
              <AIResponseContainer />
            </CardContent>
          </Card>

          {/* Market Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Competitive Market Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">
                    Average Commercial Rent (per sq ft)
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    $24.50
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">Vacancy Rate in Area</span>
                  <span className="text-lg font-bold text-blue-600">4.2%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">Average Time to Lease</span>
                  <span className="text-lg font-bold text-purple-600">
                    3.5 months
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisScores.map((item, index) => (
              <Card key={index} style={{ ...theme.components.card }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div
                        style={{ padding: '8px', borderRadius: '8px', background: getScoreBg(item.score), display: 'flex', alignItems: 'center' }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ fontWeight: '500', fontSize: '1rem', color: theme.colors.primary }}>{item.category}</div>
                    </div>
                    <div
                      style={{ fontSize: '1.5rem', fontWeight: 'bold', color: getScoreColor(item.score) }}
                    >
                      {item.score}
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <div style={{ marginTop: '8px', fontSize: '0.85rem', color: theme.colors.mutedText }}>
                    {item.details[0]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card style={{ ...theme.components.card, textAlign: 'center' }}>
              <CardContent className="p-6">
                <Users className="w-8 h-8" style={{ color: theme.colors.primary, margin: '0 auto 8px' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.primary }}>45,000+</div>
                <div style={{ fontSize: '1rem', color: theme.colors.secondary }}>Daily Traffic Count</div>
              </CardContent>
            </Card>
            <Card style={{ ...theme.components.card, textAlign: 'center' }}>
              <CardContent className="p-6">
                <DollarSign className="w-8 h-8" style={{ color: theme.colors.secondary, margin: '0 auto 8px' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.secondary }}>$78K</div>
                <div style={{ fontSize: '1rem', color: theme.colors.secondary }}>Median Household Income</div>
              </CardContent>
            </Card>
            <Card style={{ ...theme.components.card, textAlign: 'center' }}>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8" style={{ color: theme.colors.tertiary, margin: '0 auto 8px' }} />
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.colors.tertiary }}>+12%</div>
                <div style={{ fontSize: '1rem', color: theme.colors.tertiary }}>Annual Growth Rate</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {analysisScores.map((item, index) => (
            <Card key={index} style={{ ...theme.components.card }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" style={{ color: theme.colors.primary }}>
                  {item.icon}
                  <span>{item.category}</span>
                  <Badge variant="outline" style={{ background: getScoreBg(item.score), color: getScoreColor(item.score), border: 'none' }}>
                    {item.score}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {item.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4" style={{ color: theme.colors.primary, marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', color: theme.colors.text }}>{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} style={{ ...theme.components.card }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getRecommendationIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 style={{ fontWeight: '600', color: theme.colors.primary }}>{rec.title}</h3>
                        <Badge style={{ background: getImpactBadge(rec.impact).background, color: getImpactBadge(rec.impact).color, border: 'none' }}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p style={{ fontSize: '0.95rem', color: theme.colors.text }}>
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card style={{ ...theme.components.card }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2" style={{ color: theme.colors.primary }}>
                <Brain className="w-5 h-5" style={{ color: theme.colors.primary }} />
                <span>Investment Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: theme.colors.secondary, marginBottom: '1rem' }}>
                <strong>STRONG BUY:</strong> This commercial lot represents an exceptional investment opportunity with high ROI potential. The combination of prime location, strong demographics, and favorable market conditions make it ideal for immediate development or long-term investment.
              </p>
              <div className="flex space-x-3">
                <Button style={{ ...theme.components.button.primary.base }}>
                  <DollarSign className="w-4 h-4 mr-2" style={{ color: theme.colors.background }} />
                  Request Financial Analysis
                </Button>
                <Button style={{ ...theme.components.button.secondary.base }}>
                  <Calendar className="w-4 h-4 mr-2" style={{ color: theme.colors.background }} />
                  Schedule Property Tour
                </Button>
                <Button style={{ ...theme.components.button.secondary.base }}>
                  <Truck className="w-4 h-4 mr-2" style={{ color: theme.colors.background }} />
                  Get Development Quotes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
