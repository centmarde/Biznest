"use client"

import React from "react"
import { useTheme } from "@/theme/theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Trash2, GripVertical } from "lucide-react"

interface Coordinate {
  lat: number
  lng: number
}

interface CoordinatesInputProps {
  coordinates: Coordinate[]
  onChange: (coords: Coordinate[]) => void
}

const CoordinatesInput: React.FC<CoordinatesInputProps> = ({ coordinates, onChange }) => {
  // Set default to 3 coordinates if empty on mount
  React.useEffect(() => {
    if (coordinates.length === 0) {
      onChange([
        { lat: 0, lng: 0 },
        { lat: 0, lng: 0 },
        { lat: 0, lng: 0 },
      ])
    }
  }, [coordinates, onChange])

  const handleCoordChange = (idx: number, field: "lat" | "lng", value: string) => {
    const numValue = Number.parseFloat(value) || 0
    const updated = coordinates.map((coord, i) => (i === idx ? { ...coord, [field]: numValue } : coord))
    onChange(updated)
  }

  const handleRemove = (idx: number) => {
    onChange(coordinates.filter((_, i) => i !== idx))
  }

  const formatCoordinate = (coord: Coordinate) => {
    return `${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)}`
  }

  // Always render 3 input fields
  const inputCoords = [0, 1, 2].map(i => coordinates[i] || { lat: 0, lng: 0 })

  // Get theme
  const theme = useTheme()

  return (
    <Card style={{ ...theme.components.card, maxWidth: '640px', margin: '0 auto', width: '100%' }}>
      <CardHeader style={{ paddingBottom: '1rem' }}>
        <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
          <MapPin style={{ height: 20, width: 20, color: theme.colors.primary }} />
          <span>Coordinate Points</span>
          <Badge variant="secondary" style={{ marginLeft: 'auto' }}>
            3 points
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {inputCoords.map((coord, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                background: theme.components.card.backgroundColor,
                borderRadius: theme.components.card.borderRadius,
                padding: theme.components.card.padding,
                border: theme.components.card.border,
                boxShadow: theme.components.card.boxShadow,
                transition: 'border-color 0.3s',
              }}
              className="group"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Point number circle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  background: theme.colors.primary,
                  color: theme.colors.background,
                  borderRadius: '50%',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  flexShrink: 0,
                }}>
                  {idx + 1}
                </div>

                {/* Input fields - responsive grid */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.mutedText, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Latitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={coord.lat}
                      onChange={(e) => handleCoordChange(idx, "lat", e.target.value)}
                      placeholder="0.0000"
                      style={{ ...theme.components.input.base, height: 36, fontSize: '0.875rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.mutedText, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Longitude
                    </label>
                    <Input
                      type="number"
                      step="any"
                      value={coord.lng}
                      onChange={(e) => handleCoordChange(idx, "lng", e.target.value)}
                      placeholder="0.0000"
                      style={{ ...theme.components.input.base, height: 36, fontSize: '0.875rem' }}
                    />
                  </div>
                </div>

                {/* Action buttons - hidden on mobile, shown on larger screens */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  <GripVertical style={{ height: 16, width: 16, color: theme.colors.mutedText, cursor: 'grab' }} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(idx)}
                    disabled={inputCoords.length === 1}
                    style={{ ...theme.components.button.text.base, height: 32, width: 32, padding: 0, color: theme.colors.secondary, backgroundColor: 'transparent' }}
                  >
                    <Trash2 style={{ height: 16, width: 16 }} />
                  </Button>
                </div>
              </div>

              {/* Mobile action buttons - shown only on mobile */}
              <div className="sm:hidden flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div style={{ fontSize: '0.75rem', color: theme.colors.mutedText, fontFamily: 'monospace' }}>
                  {formatCoordinate(coord)}
                </div>
                <div className="flex items-center gap-2">
                  <GripVertical style={{ height: 16, width: 16, color: theme.colors.mutedText, cursor: 'grab' }} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(idx)}
                    disabled={inputCoords.length === 1}
                    style={{ ...theme.components.button.text.base, height: 32, width: 32, padding: 0, color: theme.colors.secondary, backgroundColor: 'transparent' }}
                  >
                    <Trash2 style={{ height: 16, width: 16 }} />
                  </Button>
                </div>
              </div>

              {/* Coordinate display for desktop */}
              <div className="hidden sm:block mt-2" style={{ fontSize: '0.75rem', color: theme.colors.mutedText, fontFamily: 'monospace' }}>
                {formatCoordinate(coord)}
              </div>
            </div>
          ))}
        </div>

        {/* Path Preview */}
        <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: theme.colors.tertiary + '20', borderRadius: '0.5rem', border: '1px solid ' + theme.colors.primary + '33' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: theme.colors.primary, marginBottom: '0.5rem' }}>
            <MapPin style={{ height: 16, width: 16 }} />
            <span style={{ fontWeight: 500 }}>Path Preview:</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: theme.colors.mutedText, fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {inputCoords.map((coord, idx) => (
              <span key={idx} style={{ display: 'inline-block' }}>
                <span className="sm:hidden">
                  P{idx + 1}: {formatCoordinate(coord)}
                  {idx < inputCoords.length - 1 && (
                    <span style={{ display: 'block', margin: '0.25rem 0', textAlign: 'center' }}>↓</span>
                  )}
                </span>
                <span className="hidden sm:inline">
                  Point {idx + 1}: {formatCoordinate(coord)}
                  {idx < inputCoords.length - 1 && " → "}
                </span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CoordinatesInput