"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTheme } from "@/theme/theme"
import {  PlusCircle, AlertTriangle, TrendingUp, MapPin, Building, Home, Car } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import mapImage from "/images/map.png"
import { fetchNearbyData, fetchNearbySupplierByLocation } from "./analyze"
interface AnalyzeDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddToAnalytics?: () => void
  imageUrl?: string
}

interface Analysis {
  id: string
  title: string
  origin: "residential" | "business" | "traffic"
  riskLevel: "Low" | "Medium" | "Medium-High" | "High" | "Critical"
  insights: string
  businessPotential?: string
  timestamp: string
  imageUrl?: string
  metrics: {
    trafficFlow: number
    businessDensity: number
    residentialDensity: number
    riskScore: number
  }
}

// interface Prediction {
//   title: string
//   description: string
//   businessPotential: string
// }

// Mock data - replace with your actual API calls
const mockAnalysis: Analysis = {
  id: "1",
  title: "Downtown Commercial District Analysis",
  origin: "business",
  riskLevel: "Medium-High",
  insights:
    "This area shows high commercial activity with moderate traffic congestion during peak hours. The business density indicates strong economic potential but requires careful traffic management.",
  businessPotential:
    "Excellent location for retail businesses, restaurants, and service providers. High foot traffic and accessibility make it ideal for customer-facing businesses.",
  timestamp: new Date().toISOString(),
  imageUrl: "/images/map.png",
  metrics: {
    trafficFlow: 75,
    businessDensity: 85,
    residentialDensity: 45,
    riskScore: 65,
  },
}

const mockTrafficData = [
  { time: "6 AM", traffic: 20, business: 10, residential: 80 },
  { time: "9 AM", traffic: 85, business: 70, residential: 60 },
  { time: "12 PM", traffic: 90, business: 95, residential: 40 },
  { time: "3 PM", traffic: 70, business: 80, residential: 45 },
  { time: "6 PM", traffic: 95, business: 60, residential: 85 },
  { time: "9 PM", traffic: 40, business: 30, residential: 90 },
]

const mockRiskData = [
  { category: "Traffic", score: 75, color: "#ef4444" },
  { category: "Business", score: 85, color: "#3b82f6" },
  { category: "Safety", score: 60, color: "#f59e0b" },
  { category: "Growth", score: 90, color: "#10b981" },
]

const chartConfig = {
  traffic: {
    label: "Traffic Flow",
    color: "hsl(var(--chart-1))",
  },
  business: {
    label: "Business Activity",
    color: "hsl(var(--chart-2))",
  },
  residential: {
    label: "Residential Activity",
    color: "hsl(var(--chart-3))",
  },
}

const AnalyzeDialog: React.FC<AnalyzeDialogProps> = ({ isOpen, onClose, onAddToAnalytics, imageUrl }) => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error] = useState<string | null>(null)
  const [nearbyData, setNearbyData] = useState<any>(null)
  const [nearbyLoading, setNearbyLoading] = useState<boolean>(false)
  const [nearbyError, setNearbyError] = useState<string | null>(null)
  const [supplier, setSupplier] = useState<any | null>(null)
  const [supplierLoading, setSupplierLoading] = useState<boolean>(false)
  const [supplierError, setSupplierError] = useState<string | null>(null)
  const theme = useTheme()

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setAnalysis(mockAnalysis)
        setLoading(false)
      }, 1500)
      // Fetch nearby data
      fetchNearbyData(setNearbyData, setNearbyLoading, setNearbyError)
      // Fetch supplier for a demo location (e.g., "Fish Market")
      fetchNearbySupplierByLocation("Fish Market", setSupplier, setSupplierLoading, setSupplierError)
    }
  }, [isOpen])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium-High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getOriginIcon = (origin: string) => {
    switch (origin) {
      case "residential":
        return <Home className="h-4 w-4" />
      case "business":
        return <Building className="h-4 w-4" />
      case "traffic":
        return <Car className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  // const getOriginColor = (origin: string) => {
  //   switch (origin) {
  //     case "residential":
  //       return "bg-green-500"
  //     case "business":
  //       return "bg-blue-500"
  //     case "traffic":
  //       return "bg-yellow-500"
  //     default:
  //       return "bg-gray-500"
  //   }
  // }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{
          width: "80vw",
          height: "80vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
          margin: 0,
          padding: 0,
          borderRadius: 0,
          background: theme.colors.background,
          color: theme.colors.text,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogHeader style={{
          padding: "24px",
          borderBottom: `1px solid ${theme.colors.tertiary}`,
          background: theme.colors.background,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <DialogTitle style={{ fontSize: "2rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px", color: theme.colors.primary }}>
              {loading ? (
                "Loading Analysis..."
              ) : (
                <>
                  {getOriginIcon(analysis?.origin || "")}
                  {analysis?.title || "AI Map Analysis"}
                </>
              )}
            </DialogTitle>
            
          </div>
        </DialogHeader>

        <div style={{ flex: 1, overflow: "auto", background: theme.colors.background }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p style={{ color: theme.colors.mutedText }}>Analyzing map data...</p>
              </div>
            </div>
          ) : error ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "24px" }}>
              <AlertTriangle className="h-12 w-12" style={{ color: theme.colors.primary, marginBottom: "16px" }} />
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "8px" }}>Analysis Failed</h3>
              <p style={{ color: theme.colors.mutedText, marginBottom: "16px" }}>{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", padding: "24px", height: "100%" }}>
              {/* Left Column - Image and Legend */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <Card style={theme.components.card}>
                  <CardContent style={{ padding: "24px" }}>

                    <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${theme.colors.tertiary}`, marginBottom: "16px" }}>
                      <img
                        src={
                          analysis?.imageUrl || imageUrl || mapImage
                        }
                        alt="AI Analysis Visualization"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>

                    {/* Legend */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "24px", padding: "16px", background: theme.colors.tertiary, borderRadius: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }}></div>
                        <span style={{ fontSize: "0.875rem" }}>Residential</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3b82f6" }}></div>
                        <span style={{ fontSize: "0.875rem" }}>Business</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }}></div>
                        <span style={{ fontSize: "0.875rem" }}>Traffic-Prone</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Metrics Overview */}
                <Card style={theme.components.card}>
                  <CardHeader>
                    <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <TrendingUp className="h-5 w-5" />
                      Key Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div style={{ textAlign: "center", padding: "12px", background: theme.colors.tertiary, borderRadius: "8px" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: theme.colors.primary }}>{analysis?.metrics.trafficFlow}%</div>
                        <div style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>Traffic Flow</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px", background: theme.colors.tertiary, borderRadius: "8px" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>{analysis?.metrics.businessDensity}%</div>
                        <div style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>Business Density</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px", background: theme.colors.tertiary, borderRadius: "8px" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#22c55e" }}>{analysis?.metrics.residentialDensity}%</div>
                        <div style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>Residential</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "12px", background: theme.colors.tertiary, borderRadius: "8px" }}>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>{analysis?.metrics.riskScore}%</div>
                        <div style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>Risk Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Analysis and Charts */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Analysis Card */}
                <Card style={{ ...theme.components.card, borderLeft: `4px solid ${theme.colors.primary}` }}>
                  <CardHeader>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {getOriginIcon(analysis?.origin || "")}
                        Analysis Insights
                      </CardTitle>
                      <Badge variant={getRiskColor(analysis?.riskLevel || "")}>{analysis?.riskLevel} Risk</Badge>
                    </div>
                  </CardHeader>
                  <CardContent style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p style={{ color: theme.colors.mutedText, lineHeight: 1.6 }}>{analysis?.insights}</p>

                    {analysis?.businessPotential && (
                      <>
                        <Separator />
                        <div>
                          <h4 style={{ fontWeight: "bold", marginBottom: "8px" }}>Business Potential</h4>
                          <p style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>{analysis.businessPotential}</p>
                        </div>
                      </>
                    )}

                    <div style={{ fontSize: "0.75rem", color: theme.colors.mutedText, paddingTop: "8px", borderTop: `1px solid ${theme.colors.tertiary}` }}>
                      Analysis generated: {new Date(analysis?.timestamp || "").toLocaleString()}
                    </div>
                  </CardContent>
                </Card>

                {/* Charts */}
                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Activity Patterns</TabsTrigger>
                    <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="space-y-4">
                    <Card style={theme.components.card}>
                      <CardHeader>
                        <CardTitle>Daily Activity Patterns</CardTitle>
                        <CardDescription>
                          Traffic, business, and residential activity throughout the day
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <AreaChart data={nearbyData?.activity || mockTrafficData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="traffic"
                              stackId="1"
                              stroke="var(--color-traffic)"
                              fill="var(--color-traffic)"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="business"
                              stackId="1"
                              stroke="var(--color-business)"
                              fill="var(--color-business)"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="residential"
                              stackId="1"
                              stroke="var(--color-residential)"
                              fill="var(--color-residential)"
                              fillOpacity={0.6}
                            />
                          </AreaChart>
                        </ChartContainer>
                        {nearbyLoading && <div style={{ color: theme.colors.mutedText, marginTop: 8 }}>Loading nearby data...</div>}
                        {nearbyError && <div style={{ color: theme.colors.primary, marginTop: 8 }}>{nearbyError}</div>}
                        {/* Supplier Info Section */}
                        <div style={{ marginTop: 16 }}>
                          <h4 style={{ fontWeight: "bold", marginBottom: 8 }}>Nearby Supplier (Fish Market)</h4>
                          {supplierLoading && <div style={{ color: theme.colors.mutedText }}>Loading supplier...</div>}
                          {supplierError && <div style={{ color: theme.colors.primary }}>{supplierError}</div>}
                          {supplier && (
                            <div style={{ background: theme.colors.tertiary, padding: 12, borderRadius: 8 }}>
                              <div style={{ fontWeight: "bold", fontSize: "1rem" }}>{supplier.supplierName}</div>
                              <div style={{ fontSize: "0.875rem", color: theme.colors.mutedText }}>{supplier.businessType}</div>
                              <div style={{ marginTop: 8 }}>{supplier.description}</div>
                              <div style={{ marginTop: 8, fontSize: "0.875rem" }}>
                                <strong>Distance:</strong> {supplier.distance}
                              </div>
                              <div style={{ marginTop: 8, fontSize: "0.875rem" }}>
                                <strong>Contact:</strong> {supplier.contact?.phone} | {supplier.contact?.email}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="risk" className="space-y-4">
                    <Card style={theme.components.card}>
                      <CardHeader>
                        <CardTitle>Risk Assessment Breakdown</CardTitle>
                        <CardDescription>Detailed risk analysis across different categories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-[300px]">
                          <BarChart data={mockRiskData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="category" type="category" width={80} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="score" fill="var(--color-traffic)" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "24px", borderTop: `1px solid ${theme.colors.tertiary}`, background: theme.colors.tertiary }}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onAddToAnalytics} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PlusCircle className="h-4 w-4" />
            Add to Analytics
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AnalyzeDialog
