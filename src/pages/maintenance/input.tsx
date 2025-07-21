"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import theme from "@/theme/theme"

export default function BiznestPreservationForm() {
  const [materials, setMaterials] = useState("")
  const [settings, setSettings] = useState("")
  const [age, setAge] = useState("")
  const [issue, setIssue] = useState("")
  const [others, setOthers] = useState("")
  const { colors } = theme

  const materialSuggestions = ["Stone", "Wood", "Brick", "Metal", "Concrete", "Ceramic", "Glass"]
  const settingSuggestions = ["Urban", "Rural", "Coastal", "Mountain", "Forest", "Desert"]
  const ageSuggestions = ["50-100", "100-200", "200-500", "500-1000", "1000+"]
  const issueSuggestions = ["Structural damage", "Water damage", "Weathering", "Vandalism", "Neglect", "Pollution"]
  const othersSuggestions = [
    "Requires specialist consultation",
    "Historical significance",
    "Cultural value",
    "Religious importance",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ materials, settings, age, issue, others })
    // Handle form submission
    alert("Biznest assessment submitted successfully!")
  }

  return (
    <Card className="w-full mx-auto" style={{ 
      backgroundColor: colors.background,
      borderColor: colors.tertiary,
      boxShadow: `0 4px 8px rgba(76, 88, 91, 0.1)`,
    }}>
      <CardHeader>
        <CardTitle style={{ color: colors.primary }}>Biznest Assessment</CardTitle>
        <CardDescription style={{ color: colors.mutedText }}>
          Please provide details about the biznest site or artifact that needs preservation.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="materials" style={{ color: colors.primary }}>Materials Used</Label>
                <Input
                  id="materials"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="Enter materials used in construction/creation"
                  style={{ borderColor: colors.tertiary }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {materialSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-opacity-80"
                      style={{ 
                        borderColor: colors.tertiary, 
                        color: colors.primary,
                        backgroundColor: materials === suggestion ? colors.tertiary : 'transparent' 
                      }}
                      onClick={() => setMaterials(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="settings" style={{ color: colors.primary }}>Settings (Area Built)</Label>
                <Input
                  id="settings"
                  value={settings}
                  onChange={(e) => setSettings(e.target.value)}
                  placeholder="Describe the location/environment"
                  style={{ borderColor: colors.tertiary }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {settingSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-opacity-80"
                      style={{ 
                        borderColor: colors.tertiary, 
                        color: colors.primary,
                        backgroundColor: settings === suggestion ? colors.tertiary : 'transparent' 
                      }}
                      onClick={() => setSettings(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" style={{ color: colors.primary }}>Biznest Age (Years Old)</Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Approximate age in years"
                  style={{ borderColor: colors.tertiary }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {ageSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-opacity-80"
                      style={{ 
                        borderColor: colors.tertiary, 
                        color: colors.primary,
                        backgroundColor: age === suggestion ? colors.tertiary : 'transparent' 
                      }}
                      onClick={() => setAge(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Second column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="issue" style={{ color: colors.primary }}>Issue (Optional)</Label>
                <Textarea
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="Describe any specific assessment issues"
                  className="min-h-[120px]"
                  style={{ borderColor: colors.tertiary }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {issueSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-opacity-80"
                      style={{ 
                        borderColor: colors.tertiary, 
                        color: colors.primary,
                        backgroundColor: issue === suggestion ? colors.tertiary : 'transparent' 
                      }}
                      onClick={() => setIssue(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="others" style={{ color: colors.primary }}>Others</Label>
                <Textarea
                  id="others"
                  value={others}
                  onChange={(e) => setOthers(e.target.value)}
                  placeholder="Any other relevant information"
                  className="min-h-[120px]"
                  style={{ borderColor: colors.tertiary }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {othersSuggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-opacity-80"
                      style={{ 
                        borderColor: colors.tertiary, 
                        color: colors.primary,
                        backgroundColor: others === suggestion ? colors.tertiary : 'transparent' 
                      }}
                      onClick={() => setOthers(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full transition-colors"
            style={{
              backgroundColor: colors.secondary,
              color: colors.background,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.tertiary;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.secondary;
            }}
          >
            Submit Assessment
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
