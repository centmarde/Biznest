"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/theme/theme"

const data = [
  { month: "Jan", maintenance: 12 },
  { month: "Feb", maintenance: 18 },
  { month: "Mar", maintenance: 15 },
  { month: "Apr", maintenance: 22 },
  { month: "May", maintenance: 26 },
  { month: "Jun", maintenance: 24 },
  { month: "Jul", maintenance: 28 },
  { month: "Aug", maintenance: 36 },
  { month: "Sep", maintenance: 32 },
  { month: "Oct", maintenance: 30 },
  { month: "Nov", maintenance: 25 },
  { month: "Dec", maintenance: 20 },
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
          <CardTitle style={textStyle}>Maintenance Requests</CardTitle>
          <CardDescription style={mutedTextStyle}>Monthly maintenance requests over the past year</CardDescription>
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
        <CardTitle style={textStyle}>Maintenance Requests</CardTitle>
        <CardDescription style={mutedTextStyle}>Monthly maintenance requests over the past year</CardDescription>
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
                dataKey="maintenance" 
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
