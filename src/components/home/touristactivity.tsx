"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/theme/theme"

const data = [
  { day: "Mon", visitors: 420 },
  { day: "Tue", visitors: 380 },
  { day: "Wed", visitors: 450 },
  { day: "Thu", visitors: 520 },
  { day: "Fri", visitors: 780 },
  { day: "Sat", visitors: 1200 },
  { day: "Sun", visitors: 980 },
]

export function TouristActivity() {
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
          <CardTitle style={textStyle}>Tourist Activity</CardTitle>
          <CardDescription style={mutedTextStyle}>Daily visitor count for the current week</CardDescription>
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
        <CardTitle style={textStyle}>Tourist Activity</CardTitle>
        <CardDescription style={mutedTextStyle}>Daily visitor count for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.tertiary} />
              <XAxis dataKey="day" tick={{ fill: theme.colors.text }} />
              <YAxis tick={{ fill: theme.colors.text }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme.colors.background, 
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text 
                }} 
              />
              <Bar dataKey="visitors" fill={theme.colors.secondary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
