"use client"

import { AlertTriangle, Landmark, MapPin, Users } from "lucide-react"
import theme from "@/theme/theme"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewCards() {
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
          <CardTitle className="text-sm font-medium" style={textStyle}>Total Biznest Sites</CardTitle>
          <Landmark className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>248</div>
          <p className="text-xs" style={mutedTextStyle}>+12 from last year</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Maintenance Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4" style={{ color: theme.colors.secondary }} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>36</div>
          <p className="text-xs" style={mutedTextStyle}>+8 from last month</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Tourism Spots</CardTitle>
          <MapPin className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>142</div>
          <p className="text-xs" style={mutedTextStyle}>+18 from last year</p>
        </CardContent>
      </Card>
      <Card style={cardStyle}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium" style={textStyle}>Active Tourists</CardTitle>
          <Users className="h-4 w-4" style={mutedTextStyle} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={textStyle}>12,543</div>
          <p className="text-xs" style={mutedTextStyle}>+23% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
