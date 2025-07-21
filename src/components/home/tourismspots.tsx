"use client"

import { MapPin, MoreHorizontal, Star, Users } from "lucide-react"
import theme from "@/theme/theme"

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

const tourismData = [
  {
    id: "T001",
    name: "Ancient Temple of Ankor",
    location: "Siem Reap, Cambodia",
    visitors: 12500,
    rating: 4.8,
    popularity: 92,
    image: "/images/buena.jpg?height=80&width=120",
  },
  {
    id: "T002",
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    visitors: 10200,
    rating: 4.9,
    popularity: 95,
    image: "/images/buena.jpg?height=80&width=120",
  },
  {
    id: "T003",
    name: "Colosseum",
    location: "Rome, Italy",
    visitors: 9800,
    rating: 4.7,
    popularity: 88,
    image: "/images/buena.jpg?height=80&width=120",
  },
  {
    id: "T004",
    name: "Taj Mahal",
    location: "Agra, India",
    visitors: 8900,
    rating: 4.8,
    popularity: 90,
    image: "/images/buena.jpg?height=80&width=120",
  },
]

export function TourismSpots() {
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
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-xl" style={textStyle}>Top Tourism Spots</CardTitle>
          <CardDescription style={mutedTextStyle}>Most popular biznest sites by visitor count</CardDescription>
        </div>
        <Button className="ml-auto gap-1" style={buttonStyle}>
          <MapPin className="h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {tourismData.map((spot) => (
            <div key={spot.id} className="flex items-center gap-4">
              <img
                src={spot.image || "/placeholder.svg"}
                alt={spot.name}
                className="rounded-md object-cover"
                style={{ width: '120px', height: '80px' }}
              />
              <div className="grid flex-1 gap-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold" style={textStyle}>{spot.name}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>View analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Manage site</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="text-sm text-muted-foreground flex items-center" style={mutedTextStyle}>
                  <MapPin className="mr-1 h-3 w-3" /> {spot.location}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center" style={textStyle}>
                      <Users className="mr-1 h-4 w-4" style={mutedTextStyle} />
                      <span>{spot.visitors.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center" style={textStyle}>
                      <Star className="mr-1 h-4 w-4" style={{ color: theme.colors.tertiary }} />
                      <span>{spot.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={mutedTextStyle}>Popularity</span>
                    <Progress value={spot.popularity} className="h-2 w-20" style={{ backgroundColor: theme.colors.tertiary }} />
                    <span className="text-xs" style={textStyle}>{spot.popularity}%</span>
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
