// AIResponseContainer component to fetch and display AI response
function AIResponseContainer() {
  const [response, setResponse] = useState<string>("");
  useEffect(() => {
    async function fetchAIAnalysis() {
      const lotAnalysis = useLotAnalysisStore.getState();
      const businessStepper = useBusinessStepperStore.getState();
      const prompt = `Suggest business strategy and recommendations based on the following:\nLot Analysis: ${JSON.stringify(lotAnalysis)}\nBusiness Info: ${JSON.stringify(businessStepper)}`;
      const { getResponse } = Response();
      const aiText = await getResponse(prompt);
      setResponse(formatAIResponse(aiText));
    }
    fetchAIAnalysis();
  }, []);
  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: response }}
    />
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
  const [selectedTab, setSelectedTab] = useState("overview");
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
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 55) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-emerald-100";
    if (score >= 70) return "bg-blue-100";
    if (score >= 55) return "bg-amber-100";
    return "bg-red-100";
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return <XCircle className="w-5 h-5 text-slate-600" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-amber-100 text-amber-800",
      low: "bg-slate-100 text-slate-800",
    };
    return variants[impact as keyof typeof variants] || variants.low;
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Commercial Lot Analysis
                </CardTitle>
                <p className="text-indigo-100">{lotData.address}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{overallScore}</div>
              <div className="text-sm text-indigo-100">
                Business Viability Score
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-indigo-100">Lot Size</div>
              <div className="font-semibold">{lotData.lotSize}</div>
            </div>
            <div>
              <div className="text-indigo-100">Zoning</div>
              <div className="font-semibold">{lotData.zoning}</div>
            </div>
            <div>
              <div className="text-indigo-100">List Price</div>
              <div className="font-semibold">{lotData.listingPrice}</div>
            </div>
            <div>
              <div className="text-indigo-100">Est. Value</div>
              <div className="font-semibold">{lotData.estimatedValue}</div>
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
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Scores</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Score Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysisScores.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-2 rounded-lg ${getScoreBg(item.score)}`}
                      >
                        {item.icon}
                      </div>
                      <div className="font-medium text-sm">{item.category}</div>
                    </div>
                    <div
                      className={`text-2xl font-bold ${getScoreColor(
                        item.score
                      )}`}
                    >
                      {item.score}
                    </div>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <div className="mt-2 text-xs text-slate-600">
                    {item.details[0]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-800">45,000+</div>
                <div className="text-sm text-green-700">
                  Daily Traffic Count
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-800">$78K</div>
                <div className="text-sm text-blue-700">
                  Median Household Income
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-800">+12%</div>
                <div className="text-sm text-purple-700">
                  Annual Growth Rate
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

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

        <TabsContent value="detailed" className="space-y-6">
          {analysisScores.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.category}</span>
                  <Badge
                    variant="outline"
                    className={getScoreColor(item.score)}
                  >
                    {item.score}/100
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {item.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{detail}</span>
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
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getRecommendationIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">
                          {rec.title}
                        </h3>
                        <Badge className={getImpactBadge(rec.impact)}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-indigo-800">
                <Brain className="w-5 h-5" />
                <span>Investment Recommendation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo-700 mb-4">
                <strong>STRONG BUY:</strong> This commercial lot represents an
                exceptional investment opportunity with high ROI potential. The
                combination of prime location, strong demographics, and
                favorable market conditions make it ideal for immediate
                development or long-term investment.
              </p>
              <div className="flex space-x-3">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Financial Analysis
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Property Tour
                </Button>
                <Button variant="outline">
                  <Truck className="w-4 h-4 mr-2" />
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
