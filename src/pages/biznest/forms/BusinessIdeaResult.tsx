import React from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const chartData = [
  { subject: 'Market', A: 120, B: 110, fullMark: 150 },
  { subject: 'Demographics', A: 98, B: 130, fullMark: 150 },
  { subject: 'Competition', A: 86, B: 130, fullMark: 150 },
  { subject: 'Accessibility', A: 99, B: 100, fullMark: 150 },
  { subject: 'Growth', A: 85, B: 90, fullMark: 150 },
];

const suggestedLocations = [
    { id: 1, name: "Cebu IT Park", position: [10.332, 123.905] as [number, number] },
    { id: 2, name: "Mabolo", position: [10.316, 123.918] as [number, number] },
    { id: 3, name: "Talisay City", position: [10.25, 123.84] as [number, number] },
];

const BusinessIdeaResult: React.FC = () => {
  const theme = useTheme();

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>
          Business Idea Analysis
        </h1>
        <p className="mb-10 text-lg" style={{ color: theme.colors.mutedText }}>
          Here are the best locations for your business idea.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Top Location Picks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedLocations.map((loc) => (
                  <div key={loc.id} className="p-4 rounded-lg" style={{ border: `1px solid ${theme.colors.tertiary}` }}>
                    <h3 className="font-bold text-xl" style={{ color: theme.colors.primary }}>{loc.name}</h3>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="mt-8" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Comparative Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary, height: '100%' }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Suggested Locations</CardTitle>
              </CardHeader>
              <CardContent style={{ height: 'calc(100% - 4rem)'}}>
                <MapContainer center={[10.3157, 123.8854]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {suggestedLocations.map(loc => (
                    <Marker key={loc.id} position={loc.position}>
                      <Popup>{loc.name}</Popup>
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
