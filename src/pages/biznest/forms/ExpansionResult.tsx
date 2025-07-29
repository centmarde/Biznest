import React from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const expansionSpots = [
    { id: 1, name: "Downtown Core", position: [10.292, 123.901], reason: "High commercial traffic" },
    { id: 2, name: "North Reclamation Area", position: [10.32, 123.93], reason: "New development zone" },
    { id: 3, name: "South Road Properties", position: [10.27, 123.88], reason: "Upcoming business hub" },
];

const ExpansionResult: React.FC = () => {
  const theme = useTheme();

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>
          Expansion & Relocation Analysis
        </h1>
        <p className="mb-10 text-lg" style={{ color: theme.colors.mutedText }}>
          Potential spots for your business expansion or relocation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}>
              <CardHeader>
                <CardTitle style={{ color: theme.colors.primary }}>Expansion Spots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expansionSpots.map((spot) => (
                  <div key={spot.id} className="p-4 rounded-lg" style={{ border: `1px solid ${theme.colors.tertiary}` }}>
                    <h3 className="font-bold text-xl" style={{ color: theme.colors.primary }}>{spot.name}</h3>
                    <p style={{ color: theme.colors.mutedText }}>{spot.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div style={{height: '600px'}}>
            <MapContainer center={[10.30, 123.90]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '8px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {expansionSpots.map(spot => (
                <Marker key={spot.id} position={spot.position as [number, number]}>
                  <Popup>{spot.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExpansionResult;
