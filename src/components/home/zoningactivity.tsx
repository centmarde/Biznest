"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/theme/theme"
import { useIsMobile } from "@/utils/mobile"

const data = [
  { day: "Mon", permits: 12 },
  { day: "Tue", permits: 8 },
  { day: "Wed", permits: 15 },
  { day: "Thu", permits: 18 },
  { day: "Fri", permits: 25 },
  { day: "Sat", permits: 5 },
  { day: "Sun", permits: 2 },
]

export function ZoningActivity() {
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
          <CardTitle style={textStyle}>Permit Processing Activity</CardTitle>
          <CardDescription style={mutedTextStyle}>Daily business permit approvals for the current week</CardDescription>
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
        <CardTitle style={textStyle}>Permit Processing Activity</CardTitle>
        <CardDescription style={mutedTextStyle}>Daily business permit approvals for the current week</CardDescription>
      </CardHeader>
      <CardContent style={contentStyle}>
        <div className={`w-full ${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
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
                dataKey="day" 
                tick={{ 
                  fill: theme.colors.text,
                  fontSize: isMobile ? 11 : 12
                }} 
              />
              <YAxis 
                tick={{ 
                  fill: theme.colors.text,
                  fontSize: isMobile ? 11 : 12
                }} 
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
              <Bar dataKey="permits" fill={theme.colors.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
