"use client"

import * as React from "react"
import { /* ChevronRight, */ ChevronDown } from "lucide-react"
import { useTheme } from "@/theme/theme"

export interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const theme = useTheme();

  if (!items || items.length === 0) return null

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const currentItem = items[items.length - 1]

  return (
    <div className={`${className}`}>
      {/* Current location button that toggles dropdown */}
      <button 
        onClick={toggleExpand}
        className="flex items-center text-sm bg-transparent border border-transparent hover:border-gray-200 rounded-md px-3 py-1.5 transition-all"
        style={{ color: theme.colors.text }}
      >
        <span style={{ fontWeight: "500" }}>{currentItem.name}</span>
        <ChevronDown 
          className={`ml-2 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          size={16}
        />
      </button>

      {/* Dropdown with full breadcrumb path */}
      {isExpanded && (
        <div 
          className="absolute mt-1 bg-white shadow-md rounded-md p-2 z-10"
          style={{ backgroundColor: theme.colors.background, borderColor: theme.colors.tertiary }}
        >
          <div className="flex flex-col space-y-1">
            {items.map((item, index) => (
              <a 
                key={index}
                href={item.path}
                className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                style={{ 
                  color: index === items.length - 1 ? theme.colors.text : theme.colors.primary,
                  backgroundColor: index === items.length - 1 ? 'rgba(0,0,0,0.05)' : 'transparent',
                  fontWeight: index === items.length - 1 ? "500" : "normal"
                }}
                onClick={(e) => {
                  if (index === items.length - 1) {
                    e.preventDefault()
                    setIsExpanded(false)
                  }
                }}
              >
                {index > 0 && <span className="ml-2 mr-2">›</span>}
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
