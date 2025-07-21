"use client"

import { AlertTriangle, Landmark, MapPin, Users } from "lucide-react"
import { useTheme } from "@/theme/theme"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Active Business Zones</CardTitle>
          <Landmark className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>89</div>
          <p className="text-xs" style={mutedTextStyle}>+7 from last quarter</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Zoning Violations</CardTitle>
          <AlertTriangle className="h-4 w-4" style={{ color: theme.colors.secondary }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>12</div>
          <p className="text-xs" style={mutedTextStyle}>-4 from last month</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Development Projects</CardTitle>
          <MapPin className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>34</div>
          <p className="text-xs" style={mutedTextStyle}>+5 approved this month</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Business Permits</CardTitle>
          <Users className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>1,247</div>
          <p className="text-xs" style={mutedTextStyle}>+15% from last quarter</p>
        </CardContent>
      </Card>
    </div>
  )
}
