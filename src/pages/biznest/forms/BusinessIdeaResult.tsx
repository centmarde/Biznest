import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  useBusinessIdeaStore,
  logMemoryState,
} from "@/pages/biznest/data/memory-option-1";
import { Response, formatAIResponse } from "@/pages/biznest/lib/analyze";
import { MapPin, DollarSign, Clock, Store } from "lucide-react";

// Fix for default marker icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Sample suggested locations - in production, this would come from AI/API
const suggestedLocations = [
  {
    id: 1,
    address: "2847 Commerce Boulevard, IT Park, Cebu City",
    position: [10.332, 123.905] as [number, number],
    spaceType: "For Rent",
    price: "₱50,000/month",
    size: "150 sqm",
    feedback:
      "High foot traffic area with many offices nearby. Great visibility and accessibility.",
    poi: "Near restaurants, banks, and transportation hubs",
  },
  {
    id: 2,
    address: "123 Main Street, Mabolo, Cebu City",
    position: [10.316, 123.918] as [number, number],
    spaceType: "For Sale",
    price: "₱8,500,000",
    size: "200 sqm",
    feedback:
      "Residential area with growing commercial presence. Good for neighborhood businesses.",
    poi: "Close to schools, hospitals, and residential communities",
  },
  {
    id: 3,
    address: "456 Coastal Road, Talisay City",
    position: [10.25, 123.84] as [number, number],
    spaceType: "For Rent",
    price: "₱35,000/month",
    size: "120 sqm",
    feedback:
      "Developing area with new infrastructure. Lower rent with high growth potential.",
    poi: "Near shopping centers, public market, and main highway",
  },
];

const BusinessIdeaResult: React.FC = () => {
  const theme = useTheme();
  const businessData = useBusinessIdeaStore.getState();
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    logMemoryState();

    async function fetchAIAnalysis() {
      const prompt = `Based on this business information, suggest ideal locations:
      
Business Type: ${businessData.businessType}
Capital: ${businessData.capital}
Operating Hours: ${businessData.operatingHours}

Please provide:
1. Recommended locations/areas
2. Reasons why each location suits this business
3. Points of Interest (POI) that benefit this business type
4. Space requirements and pricing expectations`;

      const { getResponse } = Response();
      const aiText = await getResponse(prompt);
      setAiAnalysis(formatAIResponse(aiText));
      setLoading(false);
    }

    fetchAIAnalysis();
  }, [
    businessData.businessType,
    businessData.capital,
    businessData.operatingHours,
  ]);

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
          Recommended Locations for Your Business
        </h1>
        <p className="mb-6 text-lg" style={{ color: theme.colors.mutedText }}>
          Based on your business type, capital, and operating hours, here are
          the best locations.
        </p>

        {/* Business Summary Card */}
        <Card
          className="mb-8 pb-4"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              Your Business Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Store
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
                    Business Type
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {businessData.businessType || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign
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
                    Capital
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {businessData.capital || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock
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
                    Operating Hours
                  </div>
                  <div style={{ fontWeight: "bold", color: theme.colors.text }}>
                    {businessData.operatingHours || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis Section */}
        <Card
          className="mb-8 pb-4"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              AI Location Analysis
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <div className="lg:col-span-2 space-y-6">
            {suggestedLocations.map((location) => (
              <Card
                key={location.id}
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                }}
                className="pb-8"
              >
                <CardHeader>
                  <CardTitle
                    className="flex items-center space-x-2"
                    style={{ color: theme.colors.primary }}
                  >
                    <MapPin className="w-5 h-5" />
                    <span>{location.address}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: theme.colors.mutedText,
                          marginBottom: "4px",
                        }}
                      >
                        Type
                      </div>
                      <div
                        style={{ fontWeight: "600", color: theme.colors.text }}
                      >
                        {location.spaceType}
                      </div>
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
                          fontWeight: "600",
                          color: theme.colors.primary,
                        }}
                      >
                        {location.price}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: theme.colors.mutedText,
                          marginBottom: "4px",
                        }}
                      >
                        Size
                      </div>
                      <div
                        style={{ fontWeight: "600", color: theme.colors.text }}
                      >
                        {location.size}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: theme.colors.primary,
                        marginBottom: "8px",
                      }}
                    >
                      Feedback & Reason
                    </div>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: theme.colors.text,
                        marginBottom: "12px",
                      }}
                    >
                      {location.feedback}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: theme.colors.primary,
                        marginBottom: "8px",
                      }}
                    >
                      Points of Interest (POI)
                    </div>
                    <p
                      style={{ fontSize: "0.95rem", color: theme.colors.text }}
                    >
                      {location.poi}
                    </p>
                  </div>

                  {/* Mini Map for each location */}
                  <div
                    style={{
                      height: "200px",
                      width: "100%",
                      marginTop: "16px",
                    }}
                  >
                    <MapContainer
                      center={location.position}
                      zoom={15}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={location.position}>
                        <Popup>{location.address}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overview Map */}
          <div>
            <Card
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.tertiary,
                position: "sticky",
                top: "20px",
              }}
            >
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>
                  All Locations Overview
                </CardTitle>
              </CardHeader>
              <CardContent style={{ height: "600px" }}>
                <MapContainer
                  center={[10.3157, 123.8854]}
                  zoom={12}
                  style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {suggestedLocations.map((loc) => (
                    <Marker key={loc.id} position={loc.position}>
                      <Popup>
                        <strong>{loc.address}</strong>
                        <br />
                        {loc.spaceType}: {loc.price}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaResult;
