"use client"

import { MapPin, MoreHorizontal, Star, Users } from "lucide-react"
import { useTheme } from "@/theme/theme"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Function to generate random images using Picsum Photos API
const getRandomBusinessImage = (seed: string, width: number = 120, height: number = 80) => {
  // Convert seed to a number for consistent randomization
  const seedNumber = Math.abs(seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0));
  // Use a range of IDs that tend to have good business/architectural photos
  const imageId = (seedNumber % 900) + 100; // IDs between 100-999
  return `https://picsum.photos/id/${imageId}/${width}/${height}`;
}

const businessData = [
  {
    id: "BZ001",
    name: "Downtown Commercial District",
    location: "Central Business District",
    businesses: 245,
    zoneType: "Commercial",
    occupancy: 92,
  },
  {
    id: "BZ002",
    name: "Tech Innovation Hub",
    location: "North Industrial Park",
    businesses: 89,
    zoneType: "Mixed-Use",
    occupancy: 85,
  },
  {
    id: "BZ003",
    name: "Riverside Business Park",
    location: "Waterfront District",
    businesses: 156,
    zoneType: "Office",
    occupancy: 78,
  },
  {
    id: "BZ004",
    name: "Market Square Shopping Center",
    location: "Old Town",
    businesses: 203,
    zoneType: "Retail",
    occupancy: 95,
  },
]

export function BusinessZones() {
  const theme = useTheme();
  const cardStyle = {
    ...theme.components.card,
  }

  const textStyle = {
    color: theme.colors.text,
  }

  const mutedTextStyle = {
    color: theme.colors.mutedText,
  }

  const buttonStyle = {
    ...theme.components.button.primary.base,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  }

  return (
    <Card style={cardStyle}>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="grid gap-2 flex-1">
          <CardTitle className="text-lg sm:text-xl" style={textStyle}>Active Business Zones</CardTitle>
          <CardDescription style={mutedTextStyle}>Key commercial and business districts by activity</CardDescription>
        </div>
        <Button className="w-full sm:w-auto gap-1 my-2" style={buttonStyle}>
          <MapPin className="h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:gap-6">
          {businessData.map((zone) => (
            <div key={zone.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={getRandomBusinessImage(zone.id)}
                alt={zone.name}
                className="rounded-md object-cover w-full sm:w-[120px] h-[200px] sm:h-[80px] shrink-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/120x80/6B7280/FFFFFF?text=${zone.zoneType}`;
                }}
              />
              <div className="grid flex-1 gap-2 sm:gap-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-semibold text-lg sm:text-base" style={textStyle}>{zone.name}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="self-end sm:self-auto">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View zone details</DropdownMenuItem>
                      <DropdownMenuItem>View business analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Manage zoning</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground flex items-center" style={mutedTextStyle}>
                  <MapPin className="mr-1 h-3 w-3" /> {zone.location}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center" style={textStyle}>
                      <Users className="mr-1 h-4 w-4" style={mutedTextStyle} />
                      <span>{zone.businesses} businesses</span>
                    </div>
                    <div className="flex items-center" style={textStyle}>
                      <Star className="mr-1 h-4 w-4" style={{ color: theme.colors.tertiary }} />
                      <span>{zone.zoneType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={mutedTextStyle}>Occupancy</span>
                    <Progress value={zone.occupancy} className="h-2 w-20 sm:w-20" style={{ backgroundColor: theme.colors.tertiary }} />
                    <span className="text-xs" style={textStyle}>{zone.occupancy}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
