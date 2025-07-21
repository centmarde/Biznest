"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/theme/theme"

const data = [
  { month: "Jan", permits: 85 },
  { month: "Feb", permits: 92 },
  { month: "Mar", permits: 78 },
  { month: "Apr", permits: 105 },
  { month: "May", permits: 118 },
  { month: "Jun", permits: 125 },
  { month: "Jul", permits: 132 },
  { month: "Aug", permits: 145 },
  { month: "Sep", permits: 138 },
  { month: "Oct", permits: 142 },
  { month: "Nov", permits: 128 },
  { month: "Dec", permits: 95 },
]

export function SiteAnalytics() {
  const theme = useTheme();
  // Use client-side rendering for charts to avoid SSR issues
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cardStyle = {
    ...theme.components.card,
  }

  const textStyle = {
    color: theme.colors.text,
  }

  const mutedTextStyle = {
    color: theme.colors.mutedText,
  }

  if (!isMounted) {
    return (
      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle style={textStyle}>Business Permit Applications</CardTitle>
          <CardDescription style={mutedTextStyle}>Monthly business permit applications over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center" style={mutedTextStyle}>Loading chart...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card style={cardStyle}>
      <CardHeader>
        <CardTitle style={textStyle}>Business Permit Applications</CardTitle>
        <CardDescription style={mutedTextStyle}>Monthly business permit applications over the past year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.tertiary} />
              <XAxis dataKey="month" tick={{ fill: theme.colors.text }} />
              <YAxis tick={{ fill: theme.colors.text }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.colors.background, 
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="permits" 
                stroke={theme.colors.primary} 
                strokeWidth={2} 
                dot={{ fill: theme.colors.primary }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
