"use client"

import { AlertTriangle, ArrowUpDown, Building, Clock, MoreHorizontal } from "lucide-react"
import { useTheme } from "@/theme/theme"

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

const approvalData = [
  {
    id: "BP001",
    business: "Tech Startup Hub",
    type: "Commercial License",
    priority: "High",
    status: "Under Review",
    dueDate: "2024-08-15",
  },
  {
    id: "ZA002",
    business: "Riverside Shopping Mall",
    type: "Zoning Change",
    priority: "Critical",
    status: "Pending Approval",
    dueDate: "2024-08-10",
  },
  {
    id: "BP003",
    business: "Local Coffee Chain",
    type: "Business Permit",
    priority: "Medium",
    status: "Approved",
    dueDate: "2024-08-22",
  },
  {
    id: "ZA004",
    business: "Industrial Warehouse",
    type: "Zoning Variance",
    priority: "Critical",
    status: "Under Review",
    dueDate: "2024-08-08",
  },
  {
    id: "BP005",
    business: "Downtown Restaurant",
    type: "Liquor License",
    priority: "High",
    status: "Pending Approval",
    dueDate: "2024-08-18",
  },
]

export function ApprovalTable() {
  const theme = useTheme();
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
type ApprovalPriorityType = "Critical" | "High" | "Medium" | "Low";
type ApprovalStatusType = "Pending Approval" | "Under Review" | "Approved" | "Rejected";

const getBadgeStyle = (type: ApprovalPriorityType | ApprovalStatusType): BadgeStyleProps => {
    if (type === "Critical" || type === "High") {
        return { backgroundColor: theme.colors.primary, color: theme.colors.background };
    } else if (type === "Under Review") {
        return { backgroundColor: theme.colors.secondary, color: theme.colors.background };
    } else if (type === "Approved") {
        return { backgroundColor: '#151515', color: '#ffffff' }; // Green background with white text for approved items
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
          <CardTitle className="text-xl" style={textStyle}>Pending Approvals</CardTitle>
          <CardDescription style={mutedTextStyle}>Business permits and zoning applications awaiting approval</CardDescription>
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
              <TableHead>Business</TableHead>
              <TableHead>Application Type</TableHead>
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
            {approvalData.map((item) => (
              <TableRow key={item.id} style={tableStyles}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.business}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Badge
                    style={getBadgeStyle(item.priority as ApprovalPriorityType)}
                  >
                    {item.priority === "Critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {item.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    style={getBadgeStyle(item.status as ApprovalStatusType)}
                  >
                    {item.status === "Approved" && <Clock className="mr-1 h-3 w-3" />}
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
                      <DropdownMenuItem>Review application</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Schedule meeting</DropdownMenuItem>
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
