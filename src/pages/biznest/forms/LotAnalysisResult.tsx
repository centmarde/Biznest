import React, { useEffect } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Zustand stores and logMemoryState import
import { logMemoryState} from "../data/memory-option-1";

// Fix for default marker icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const chartData = [
  { name: 'Profitability', value: 80 },
  { name: 'Competition', value: 60 },
  { name: 'Demand', value: 90 },
  { name: 'Growth Pot.', value: 75 },
];


const LotAnalysisResult: React.FC = () => {
  const theme = useTheme();

  // Log Zustand memory state on mount
  useEffect(() => {
    logMemoryState();
  }, []);

  const recommendations = [
    { title: "Boutique Coffee Shop", reason: "High foot traffic and low competition for premium coffee." },
    { title: "Specialty Bookstore", reason: "Growing demographic of young readers in the area." },
    { title: "Fitness Studio", reason: "High demand for health and wellness services." },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>
          Lot Results
        </h1>
        <p className="mb-10 text-lg" style={{ color: theme.colors.mutedText }}>
          Based on your lot's details, here are the most promising business opportunities.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Top Business Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg" style={{ border: `1px solid ${theme.colors.tertiary}` }}>
                    <h3 className="font-bold text-xl" style={{ color: theme.colors.primary }}>{rec.title}</h3>
                    <p style={{ color: theme.colors.mutedText }}>{rec.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="mt-8" style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Market Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={theme.colors.mutedText} />
                    <YAxis stroke={theme.colors.mutedText}/>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.tertiary,
                        color: theme.colors.text,
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill={theme.colors.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Your Lot Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: '400px', width: '100%' }}>
                  <MapContainer center={[10.3157, 123.8854]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[10.3157, 123.8854]}>
                      <Popup>
                        Your Lot Location.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <p className="text-center mt-4" style={{ color: theme.colors.mutedText }}>
                  This map shows the approximate location of your lot. You can explore the surrounding area to better understand the context of our recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LotAnalysisResult;
