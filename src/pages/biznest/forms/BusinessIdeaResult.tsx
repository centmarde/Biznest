import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    rank: 1,
    rankLabel: "Best Pick",
    rankColor: "#F59E0B",
    rankBadge: "🥇",
    address: "J.C. Aquino Avenue, Butuan City, Agusan del Norte",
    position: [8.9470, 125.5406] as [number, number],
    spaceType: "For Rent",
    price: "₱25,000/month",
    size: "150 sqm",
    feedback:
      "Prime commercial area with high foot traffic. Located near government offices, banks, and major shopping centers.",
    poi: "Near Butuan City Hall, banks, Gaisano Grand Mall, and transportation terminals",
  },
  {
    id: 2,
    rank: 2,
    rankLabel: "2nd Choice",
    rankColor: "#9CA3AF",
    rankBadge: "🥈",
    address: "Montilla Boulevard, Butuan City, Agusan del Norte",
    position: [8.9494, 125.5447] as [number, number],
    spaceType: "For Sale",
    price: "₱4,500,000",
    size: "200 sqm",
    feedback:
      "Growing commercial district with mixed residential and business establishments. Great for community-focused businesses.",
    poi: "Close to schools, hospitals, residential subdivisions, and public market",
  },
  {
    id: 3,
    rank: 3,
    rankLabel: "3rd Choice",
    rankColor: "#B45309",
    rankBadge: "🥉",
    address: "Langihan Road, Butuan City, Agusan del Norte",
    position: [8.9350, 125.5280] as [number, number],
    spaceType: "For Rent",
    price: "₱18,000/month",
    size: "120 sqm",
    feedback:
      "Emerging commercial area with lower rental costs. Good for startups and businesses targeting local communities.",
    poi: "Near Butuan National High School, barangay halls, and residential areas",
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
      const prompt = `Based on this business information, suggest ideal locations in Butuan City, Agusan del Norte, Philippines:
      
Business Type: ${businessData.businessType}
Capital: ${businessData.capital}
Operating Hours: ${businessData.operatingHours}

Please provide analysis specifically for Butuan City:
1. Recommended locations/areas in Butuan City
2. Reasons why each location suits this business in the local Butuan context
3. Points of Interest (POI) that benefit this business type in Butuan
4. Space requirements and pricing expectations for Butuan City market
5. Local business considerations and opportunities in Agusan del Norte region`;

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
          {/* Location Cards - 1 row, 3 columns with ranking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {suggestedLocations.map((location) => (
            <Card
              key={location.id}
              className="flex flex-col overflow-hidden"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: location.rank === 1 ? location.rankColor : theme.colors.tertiary,
                borderWidth: location.rank === 1 ? "2px" : "1px",
              }}
            >
              {/* Rank Header */}
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: `${location.rankColor}20` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{location.rankBadge}</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: location.rankColor }}
                  >
                    {location.rankLabel}
                  </span>
                </div>
                <Badge
                  style={{
                    backgroundColor: `${location.rankColor}20`,
                    color: location.rankColor,
                    borderColor: location.rankColor,
                    border: "1px solid"
                  }}
                >
                  #{location.rank}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <CardTitle
                  className="flex items-start gap-2 text-sm leading-tight"
                  style={{ color: theme.colors.primary }}
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{location.address}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 flex-1">
                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div
                    className="rounded-lg p-2"
                    style={{ backgroundColor: `${theme.colors.primary}10` }}
                  >
                    <p className="text-xs mb-1" style={{ color: theme.colors.mutedText }}>Type</p>
                    <p className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                      {location.spaceType}
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-2"
                    style={{ backgroundColor: `${theme.colors.primary}10` }}
                  >
                    <p className="text-xs mb-1" style={{ color: theme.colors.mutedText }}>Price</p>
                    <p className="text-xs font-semibold" style={{ color: theme.colors.primary }}>
                      {location.price}
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-2"
                    style={{ backgroundColor: `${theme.colors.primary}10` }}
                  >
                    <p className="text-xs mb-1" style={{ color: theme.colors.mutedText }}>Size</p>
                    <p className="text-xs font-semibold" style={{ color: theme.colors.text }}>
                      {location.size}
                    </p>
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    Why this location?
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.colors.text }}>
                    {location.feedback}
                  </p>
                </div>

                {/* POI */}
                <div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: theme.colors.primary }}
                  >
                    Points of Interest
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: theme.colors.mutedText }}>
                    {location.poi}
                  </p>
                </div>

                {/* Mini Map */}
                <div className="rounded-lg overflow-hidden" style={{ height: "160px" }}>
                  <MapContainer
                    center={location.position}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
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
        <Card
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.tertiary,
          }}
        >
          <CardHeader>
            <CardTitle style={{ color: theme.colors.primary }}>
              All Locations Overview — Butuan City
            </CardTitle>
          </CardHeader>
          <CardContent style={{ height: "400px" }}>
            <MapContainer
              center={[8.9470, 125.5406]}
              zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: "8px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {suggestedLocations.map((loc) => (
                <Marker key={loc.id} position={loc.position}>
                  <Popup>
                    <strong>{loc.rankBadge} {loc.rankLabel}</strong><br />
                    {loc.address}<br />
                    {loc.spaceType}: {loc.price}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* AI Analysis Section */}
        <Card
          className="my-8 pb-4"
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

      

    
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaResult;
