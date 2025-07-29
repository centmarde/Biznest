"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, MapPin, Users, Building2, Calendar, Download, Map, List, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import axios from "axios"

interface Business {
  id: string
  name: string
  industry: string
  address: string
  district: string
  employees: number
  founded: string
  revenue: string
  businessType: "Startup" | "SME" | "Corporation" | "Franchise"
  status: "Active" | "Expanding" | "Relocating" | "New"
  contact: string
  description: string
  coordinates: { lat: number; lng: number }
}

const industries = [
  "All",
  "Technology",
  "Healthcare",
  "Energy",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Education",
  "Transportation",
]
const districts = [
  "All",
  "Downtown Tech District",
  "Medical District",
  "Industrial Zone",
  "Financial District",
  "Shopping District",
  "Restaurant Row",
  "Education Quarter",
]
const businessTypes = ["All", "Startup", "SME", "Corporation", "Franchise"]
const statuses = ["All", "Active", "Expanding", "Relocating", "New"]


import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";

export default function BusinessDirectory() {
  const theme = useTheme();
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedDistrict, setSelectedDistrict] = useState("All")
  const [selectedBusinessType, setSelectedBusinessType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list")
  const [employeeRange/* , setEmployeeRange */] = useState<[number, number]>([0, 1000])
  // Pagination state
  const [page, setPage] = useState(1)
  const pageSize = 2

  useEffect(() => {
    axios.get("/data/old_stats.json").then((res) => {
      setBusinesses(res.data)
    })
  }, [])

  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((business) => {
        const matchesSearch =
          business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          business.address.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesIndustry = selectedIndustry === "All" || business.industry === selectedIndustry
        const matchesDistrict = selectedDistrict === "All" || business.district === selectedDistrict
        const matchesBusinessType = selectedBusinessType === "All" || business.businessType === selectedBusinessType
        const matchesStatus = selectedStatus === "All" || business.status === selectedStatus
        const matchesEmployeeRange = business.employees >= employeeRange[0] && business.employees <= employeeRange[1]

        return (
          matchesSearch &&
          matchesIndustry &&
          matchesDistrict &&
          matchesBusinessType &&
          matchesStatus &&
          matchesEmployeeRange
        )
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name)
          case "employees":
            return b.employees - a.employees
          case "founded":
            return new Date(b.founded).getTime() - new Date(a.founded).getTime()
          case "revenue":
            return Number.parseFloat(b.revenue.replace(/[$M]/g, "")) - Number.parseFloat(a.revenue.replace(/[$M]/g, ""))
          default:
            return 0
        }
      })
  }, [businesses, searchTerm, selectedIndustry, selectedDistrict, selectedBusinessType, selectedStatus, employeeRange, sortBy])

  // Calculate paginated businesses
  const totalPages = Math.ceil(filteredBusinesses.length / pageSize)
  const paginatedBusinesses = filteredBusinesses.slice((page - 1) * pageSize, page * pageSize)

  const BusinessCard = ({ business }: { business: Business }) => (
    <Card style={theme.components.card} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg" style={theme.components.text.heading}>{business.name}</CardTitle>
            <CardDescription className="flex items-center mt-1" style={theme.components.text.body}>
              <MapPin className="h-3 w-3 mr-1" style={{ color: theme.colors.primary }} />
              {business.address}, {business.district}
            </CardDescription>
          </div>
          {business.status === "New" ? (
            <Badge style={{ backgroundColor: '#ef4444', color: '#fff' }}>Defunct</Badge>
          ) : (
            <Badge variant={business.status === "Expanding" ? "secondary" : "outline"} style={theme.components.button.secondary.base}>{business.status}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground" style={theme.components.text.body}>{business.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground" style={theme.components.text.body}>Industry:</span>
            <Badge variant="outline" className="ml-2 text-xs" style={theme.components.button.text.base}>
              {business.industry}
            </Badge>
          </div>
          <div>
            <span className="text-muted-foreground" style={theme.components.text.body}>Type:</span>
            <span className="ml-2 font-medium" style={theme.components.text.body}>{business.businessType}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" style={{ color: theme.colors.primary }} />
            <span style={theme.components.text.body}>{business.employees} employees</span>
          </div>
          <div>
            <span className="text-muted-foreground" style={theme.components.text.body}>Revenue:</span>
            <span className="ml-2 font-medium" style={theme.components.text.body}>{business.revenue}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-xs text-muted-foreground" style={theme.components.text.small}>
            <Calendar className="h-3 w-3 mr-1" style={{ color: theme.colors.primary }} />
            Founded {business.founded}
          </div>
          <Button variant="outline" size="sm" style={theme.components.button.secondary.base}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DefaultLayout>
      <div
        className="min-h-screen"
        style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
      >
      {/* Header */}
      <div
        className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8" style={{ color: theme.colors.primary }} />
              <div>
                <h1 className="text-2xl font-bold" style={theme.components.text.heading}>Business Directory</h1>
                <p style={{ color: theme.colors.mutedText }}>City Planning & Economic Development</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" style={theme.components.button.secondary.base}>
                <Download className="h-4 w-4 mr-2" style={{ color: theme.colors.background }} />
                Export Data
              </Button>
              <Button variant="outline" size="sm" style={theme.components.button.secondary.base}>
                Planning Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6" style={{ color: theme.colors.text }}>
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-80 space-y-6">
            <Card style={theme.components.card}>
              <CardHeader>
                <CardTitle className="text-lg" style={theme.components.text.heading}>Search & Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" style={{ color: theme.colors.primary }} />
                  <Input
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    style={theme.components.input.base}
                  />
                </div>

                <Separator />

                {/* Industry Filter */}
                <div>
                  <Label className="text-sm font-medium" style={theme.components.text.body}>Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="mt-1" style={theme.components.input.base}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={theme.components.card}>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry} style={theme.components.text.body}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District Filter */}
                <div>
                  <Label className="text-sm font-medium" style={theme.components.text.body}>District</Label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="mt-1" style={theme.components.input.base}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={theme.components.card}>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} style={theme.components.text.body}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Type Filter */}
                <div>
                  <Label className="text-sm font-medium" style={theme.components.text.body}>Business Type</Label>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger className="mt-1" style={theme.components.input.base}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={theme.components.card}>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type} style={theme.components.text.body}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div>
                  <Label className="text-sm font-medium" style={theme.components.text.body}>Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-1" style={theme.components.input.base}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={theme.components.card}>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status} style={theme.components.text.body}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Quick Stats */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium" style={theme.components.text.body}>Quick Stats</Label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted p-2 rounded" style={theme.components.card}>
                      <div className="font-medium" style={theme.components.text.body}>{filteredBusinesses.length}</div>
                      <div style={{ color: theme.colors.mutedText }}>Total Businesses</div>
                    </div>
                    <div className="bg-muted p-2 rounded" style={theme.components.card}>
                      <div className="font-medium" style={theme.components.text.body}>
                        {filteredBusinesses.reduce((sum, b) => sum + b.employees, 0).toLocaleString()}
                      </div>
                      <div style={{ color: theme.colors.mutedText }}>Total Jobs</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
            <div className="flex-1 space-y-4" style={{ color: theme.colors.text }}>
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label className="text-sm" style={theme.components.text.body}>Sort by:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32" style={theme.components.input.base}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={theme.components.card}>
                      <SelectItem value="name" style={theme.components.text.body}>Name</SelectItem>
                      <SelectItem value="employees" style={theme.components.text.body}>Employees</SelectItem>
                      <SelectItem value="founded" style={theme.components.text.body}>Founded</SelectItem>
                      <SelectItem value="revenue" style={theme.components.text.body}>Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm" style={{ color: theme.colors.mutedText }}>
                  Showing {filteredBusinesses.length} of {businesses.length} businesses
                </div>
              </div>

              <div className="flex items-center space-x-1 border rounded-md" style={{ borderColor: theme.colors.tertiary }}>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  style={theme.components.button.primary.base}
                >
                  <List className="h-4 w-4" style={{ color: theme.colors.background }} />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  style={theme.components.button.primary.base}
                >
                  <Grid3X3 className="h-4 w-4" style={{ color: theme.colors.background }} />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  style={theme.components.button.primary.base}
                >
                  <Map className="h-4 w-4" style={{ color: theme.colors.background }} />
                </Button>
              </div>
            </div>

            {/* Business List */}
            {viewMode === "list" && (
              <>
                <div className="space-y-4">
                  {paginatedBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setPage(page - 1)}
                            className="mx-3"
                            style={theme.components.button.text.base}
                          >
                            Previous
                          </PaginationLink>
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={page === i + 1}
                              onClick={() => setPage(i + 1)}
                              style={theme.components.button.text.base}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setPage(page + 1)}
                            style={theme.components.button.text.base}
                          >
                            Next
                          </PaginationLink>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}

            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            )}

            {viewMode === "map" && (
              <Card className="h-[600px]" style={theme.components.card}>
                <CardContent className="p-6 h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Map className="h-12 w-12 mx-auto" style={{ color: theme.colors.primary }} />
                    <h3 className="text-lg font-medium" style={theme.components.text.heading}>Interactive Map View</h3>
                    <p style={{ color: theme.colors.mutedText }}>
                      Map integration would show business locations with clustering and detailed popups
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      {filteredBusinesses.slice(0, 4).map((business) => (
                        <div key={business.id} className="p-2 border rounded text-left" style={{ borderColor: theme.colors.tertiary }}>
                          <div className="font-medium" style={theme.components.text.body}>{business.name}</div>
                          <div className="text-xs" style={{ color: theme.colors.mutedText }}>{business.district}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredBusinesses.length === 0 && (
              <Card style={theme.components.card}>
                <CardContent className="p-12 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-4" style={{ color: theme.colors.mutedText }} />
                  <h3 className="text-lg font-medium mb-2" style={theme.components.text.heading}>No businesses found</h3>
                  <p style={{ color: theme.colors.mutedText }}>
                    Try adjusting your search criteria or filters to find more businesses.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      </div>
    </DefaultLayout>
  )
}
