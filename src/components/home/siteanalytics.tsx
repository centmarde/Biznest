"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/theme/theme"
import { useIsMobile } from "@/utils/mobile"

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
  const isMobile = useIsMobile();
  // Use client-side rendering for charts to avoid SSR issues
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cardStyle = {
    ...theme.components.card,
    ...(isMobile && {
      margin: '0.1rem',
      padding: '0',
    })
  }

  const headerStyle = isMobile ? {
    padding: '1rem 1rem 0.5rem 1rem'
  } : {}

  const contentStyle = isMobile ? {
    padding: '0.75rem 1rem 1.25rem 1rem'
  } : {
    padding: '1.5rem'
  }

  const textStyle = {
    color: theme.colors.text,
    ...(isMobile && {
      fontSize: '1.1rem'
    })
  }

  const mutedTextStyle = {
    color: theme.colors.mutedText,
    ...(isMobile && {
      fontSize: '0.85rem',
      lineHeight: '1.2'
    })
  }

  if (!isMounted) {
    return (
      <Card style={cardStyle}>
        <CardHeader style={headerStyle}>
          <CardTitle style={textStyle}>Business Permit Applications</CardTitle>
          <CardDescription style={mutedTextStyle}>Monthly business permit applications over the past year</CardDescription>
        </CardHeader>
        <CardContent style={contentStyle}>
          <div 
            className={`w-full flex items-center justify-center ${isMobile ? 'h-[250px]' : 'h-[300px]'}`}
            style={mutedTextStyle}
          >
            Loading chart...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card style={cardStyle}>
      <CardHeader style={headerStyle}>
        <CardTitle style={textStyle}>Business Permit Applications</CardTitle>
        <CardDescription style={mutedTextStyle}>Monthly business permit applications over the past year</CardDescription>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div className={`w-full ${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ 
                top: 5, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 10 : 20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.tertiary} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: theme.colors.text, fontSize: isMobile ? 11 : 12 }} 
              />
              <YAxis 
                tick={{ fill: theme.colors.text, fontSize: isMobile ? 11 : 12 }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.colors.background, 
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text,
                  fontSize: isMobile ? '12px' : '14px',
                  padding: isMobile ? '8px' : '12px'
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
