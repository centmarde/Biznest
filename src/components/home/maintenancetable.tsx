"use client"

import { AlertTriangle, ArrowUpDown, Building, Clock, MoreHorizontal } from "lucide-react"
import theme from "@/theme/theme"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const maintenanceData = [
  {
    id: "M001",
    site: "Ancient Temple of Ankor",
    issue: "Structural damage to east wall",
    priority: "High",
    status: "Pending",
    dueDate: "2023-09-15",
  },
  {
    id: "M002",
    site: "Historic Castle Ruins",
    issue: "Water damage to foundation",
    priority: "Critical",
    status: "In Progress",
    dueDate: "2023-09-10",
  },
  {
    id: "M003",
    site: "Colonial Museum",
    issue: "Roof leakage in main hall",
    priority: "Medium",
    status: "Scheduled",
    dueDate: "2023-09-22",
  },
  {
    id: "M004",
    site: "Ancient Lighthouse",
    issue: "Erosion of base structure",
    priority: "Critical",
    status: "Pending",
    dueDate: "2023-09-08",
  },
  {
    id: "M005",
    site: "Indigenous Rock Art Site",
    issue: "Vandalism protection needed",
    priority: "High",
    status: "In Progress",
    dueDate: "2023-09-18",
  },
]

export function MaintenanceTable() {
  const cardStyle = {
    ...theme.components.card,
  }

  const textStyle = {
    color: theme.colors.text,
  }

  const mutedTextStyle = {
    color: theme.colors.mutedText,
  }

  const buttonStyle = {
    ...theme.components.button.primary.base,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  }

  const tableStyles = {
    color: theme.colors.text,
  }

interface BadgeStyleProps {
    backgroundColor: string;
    color: string;
    border?: string;
}

// Define a type for the priority and status values
type MaintenancePriorityType = "Critical" | "High" | "Medium" | "Low";
type MaintenanceStatusType = "In Progress" | "Pending" | "Scheduled" | "Completed";

const getBadgeStyle = (type: MaintenancePriorityType | MaintenanceStatusType): BadgeStyleProps => {
    if (type === "Critical" || type === "High") {
        return { backgroundColor: theme.colors.primary, color: theme.colors.background };
    } else if (type === "In Progress") {
        return { backgroundColor: theme.colors.secondary, color: theme.colors.background };
    } else if (type === "Scheduled") {
        return { backgroundColor: theme.colors.tertiary, color: theme.colors.text };
    } else {
        return { 
            backgroundColor: 'transparent', 
            color: theme.colors.text,
            border: `1px solid ${theme.colors.tertiary}`
        };
    }
};

  return (
    <Card style={cardStyle}>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="text-xl" style={textStyle}>Urgent Maintenance</CardTitle>
          <CardDescription style={mutedTextStyle}>Descreption Here</CardDescription>
        </div>
        <Button className="ml-auto gap-1" style={buttonStyle}>
          <Building className="h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow style={tableStyles}>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Priority
                  <Button variant="ghost" size="icon" className="h-4 w-4">
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Due Date
                  <Button variant="ghost" size="icon" className="h-4 w-4">
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceData.map((item) => (
              <TableRow key={item.id} style={tableStyles}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.site}</TableCell>
                <TableCell>{item.issue}</TableCell>
                <TableCell>
                  <Badge
                    style={getBadgeStyle(item.priority as MaintenancePriorityType)}
                  >
                    {item.priority === "Critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    style={getBadgeStyle(item.status as MaintenanceStatusType)}
                  >
                    {item.status === "Scheduled" && <Clock className="mr-1 h-3 w-3" />}
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(item.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Assign team</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
