import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useSpaceSearchStore,
  logMemoryState,
} from "@/pages/biznest/data/memory-option-1";
import { Response, formatAIResponse } from "@/pages/biznest/lib/analyze";
import {
  MapPin,
  DollarSign,
  Maximize2,
  TrendingUp,
  Building,
  Star,
} from "lucide-react";

// Sample top 5 recommended locations - in production, this would come from AI/API
const topLocations = [
  {
    id: 1,
    rank: 1,
    name: "Prime Commercial Space - IT Park",
    address: "2847 Commerce Boulevard, IT Park, Cebu City",
    type: "For Rent",
    price: "₱55,000/month",
    size: "180 sqm",
    pricePerSqm: "₱305.56/sqm",
    features: [
      "High foot traffic area",
      "Near major tech companies",
      "24/7 security",
      "Ample parking space",
    ],
    rating: 4.8,
  },
  {
    id: 2,
    rank: 2,
    name: "Commercial Lot - Mandaue",
    address: "456 Highway Road, Mandaue City",
    type: "For Sale",
    price: "₱12,500,000",
    size: "250 sqm",
    pricePerSqm: "₱50,000/sqm",
    features: [
      "Corner lot with excellent visibility",
      "Along main highway",
      "Commercial zoning",
      "Growing business district",
    ],
    rating: 4.7,
  },
  {
    id: 3,
    rank: 3,
    name: "Retail Space - Ayala Center",
    address: "789 Business Street, Cebu Business Park",
    type: "For Rent",
    price: "₱80,000/month",
    size: "150 sqm",
    pricePerSqm: "₱533.33/sqm",
    features: [
      "Premium mall location",
      "High customer traffic",
      "Modern facilities",
      "Brand visibility",
    ],
    rating: 4.9,
  },
  {
    id: 4,
    rank: 4,
    name: "Mixed-Use Space - Mabolo",
    address: "123 Main Avenue, Mabolo, Cebu City",
    type: "For Rent",
    price: "₱40,000/month",
    size: "120 sqm",
    pricePerSqm: "₱333.33/sqm",
    features: [
      "Residential-commercial area",
      "Good public transport access",
      "Flexible space layout",
      "Affordable pricing",
    ],
    rating: 4.5,
  },
  {
    id: 5,
    rank: 5,
    name: "Commercial Lot - Talisay",
    address: "321 Coastal Highway, Talisay City",
    type: "For Sale",
    price: "₱8,800,000",
    size: "200 sqm",
    pricePerSqm: "₱44,000/sqm",
    features: [
      "Developing area with growth potential",
      "Near South Road Properties",
      "Lower acquisition cost",
      "Investment opportunity",
    ],
    rating: 4.4,
  },
];

const SpaceSearchResult: React.FC = () => {
  const theme = useTheme();
  const spaceData = useSpaceSearchStore.getState();
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    logMemoryState();

    async function fetchAIAnalysis() {
      const prompt = `Based on the following space requirements, provide detailed recommendations for the top 5 locations:
      
Preferred Address/Area: ${spaceData.address}
Required Space Size: ${spaceData.size}

Please provide:
1. Analysis of the requested area
2. Market trends for commercial spaces in this location
3. Price range expectations
4. Key factors to consider when selecting a space
5. Investment or rental recommendations`;

      const { getResponse } = Response();
      const aiText = await getResponse(prompt);
      setAiAnalysis(formatAIResponse(aiText));
      setLoading(false);
    }

    fetchAIAnalysis();
  }, [spaceData.address, spaceData.size]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.7) return theme.colors.primary;
    if (rating >= 4.5) return theme.colors.secondary;
    return theme.colors.tertiary;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return { bg: "#fbbf24", text: "#78350f" }; // gold
    if (rank === 2) return { bg: "#d1d5db", text: "#1f2937" }; // silver
    if (rank === 3) return { bg: "#f97316", text: "#7c2d12" }; // bronze
    return { bg: theme.colors.tertiary, text: theme.colors.text };
  };

  return (
    <DefaultLayout>
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: theme.colors.primary }}
        >
          Top 5 Recommended Spaces
        </h1>
        <p className="mb-6 text-lg" style={{ color: theme.colors.mutedText }}>
          Based on your requirements for {spaceData.address} with{" "}
          {spaceData.size} space.
        </p>

        {/* Search Criteria Summary */}
        <Card
          className="mb-8"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              Your Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin
                  className="w-5 h-5"
                  style={{ color: theme.colors.primary }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: theme.colors.mutedText,
                    }}
                  >
                    Preferred Area
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {spaceData.address || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Maximize2
                  className="w-5 h-5"
                  style={{ color: theme.colors.primary }}
                />
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: theme.colors.mutedText,
                    }}
                  >
                    Required Size
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {spaceData.size || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Section */}
        <Card
          className="mb-8"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              AI Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-slate max-w-none">
              {loading || !aiAnalysis ? (
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
                <div dangerouslySetInnerHTML={{ __html: aiAnalysis }} />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Locations List */}
        <div className="space-y-6">
          {topLocations.map((location) => {
            const rankColors = getRankBadgeColor(location.rank);
            return (
              <Card
                key={location.id}
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  borderLeft: `4px solid ${theme.colors.primary}`,
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Badge
                        style={{
                          backgroundColor: rankColors.bg,
                          color: rankColors.text,
                          fontSize: "1.25rem",
                          padding: "8px 16px",
                          fontWeight: "bold",
                        }}
                      >
                        #{location.rank}
                      </Badge>
                      <div className="flex-1">
                        <CardTitle
                          className="text-2xl mb-2"
                          style={{ color: theme.colors.primary }}
                        >
                          {location.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin
                            className="w-4 h-4"
                            style={{ color: theme.colors.mutedText }}
                          />
                          <span style={{ color: theme.colors.text }}>
                            {location.address}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star
                            className="w-4 h-4"
                            style={{ color: getRatingColor(location.rating) }}
                          />
                          <span
                            style={{
                              fontWeight: "bold",
                              color: getRatingColor(location.rating),
                            }}
                          >
                            {location.rating}
                          </span>
                          <span style={{ color: theme.colors.mutedText }}>
                            Rating
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor:
                          location.type === "For Rent" ? "#dbeafe" : "#dcfce7",
                        color:
                          location.type === "For Rent" ? "#1e40af" : "#166534",
                        border: "none",
                        padding: "6px 12px",
                      }}
                    >
                      {location.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Price and Size Grid */}
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 rounded-lg"
                    style={{ backgroundColor: theme.colors.tertiary }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: theme.colors.background,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <DollarSign
                          className="w-6 h-6"
                          style={{ color: theme.colors.primary }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: theme.colors.mutedText,
                            marginBottom: "4px",
                          }}
                        >
                          Price
                        </div>
                        <div
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: theme.colors.primary,
                          }}
                        >
                          {location.price}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: theme.colors.background,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Maximize2
                          className="w-6 h-6"
                          style={{ color: theme.colors.secondary }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: theme.colors.mutedText,
                            marginBottom: "4px",
                          }}
                        >
                          Space Size
                        </div>
                        <div
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: theme.colors.text,
                          }}
                        >
                          {location.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: theme.colors.background,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TrendingUp
                          className="w-6 h-6"
                          style={{ color: theme.colors.tertiary }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: theme.colors.mutedText,
                            marginBottom: "4px",
                          }}
                        >
                          Price per sqm
                        </div>
                        <div
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: theme.colors.text,
                          }}
                        >
                          {location.pricePerSqm}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: theme.colors.primary,
                        marginBottom: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Building className="w-4 h-4" />
                      Key Features
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {location.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: theme.colors.primary,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.95rem",
                              color: theme.colors.text,
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SpaceSearchResult;
