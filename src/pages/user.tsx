import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { DashboardShell } from "@/components/home/dashboardshell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Building2, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  MapPin,
  Calendar,
  Download,
  UserPlus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import ChatButton from "@/components/AIrelated/ChatButton";

// Mock data for LGU stats
const lguStats = {
  totalBusinesses: 1247,
  totalUsers: 342,
  activeApplications: 89,
  approvedThisMonth: 156,
  pendingReviews: 23,
  zoningRequests: 45,
  revenueGenerated: "₱2,450,000"
};

const recentReports = [
  {
    id: 1,
    title: "Monthly Business Registration Report",
    date: "2025-07-25",
    type: "Business Registration",
    status: "Complete"
  },
  {
    id: 2,
    title: "Zoning Compliance Analysis",
    date: "2025-07-22",
    type: "Zoning",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Revenue Collection Summary",
    date: "2025-07-20",
    type: "Financial",
    status: "Complete"
  },
  {
    id: 4,
    title: "Business Growth Trends Q2",
    date: "2025-07-18",
    type: "Analytics",
    status: "Complete"
  }
];

// Mock data for users
const userData = [
  {
    id: 1,
    name: "Juan dela Cruz",
    email: "juan.delacruz@email.com",
    role: "BusinessOwner",
    businessCount: 3,
    joinDate: "2025-01-15",
    status: "Active",
    lastLogin: "2025-07-27"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    role: "BusinessOwner",
    businessCount: 1,
    joinDate: "2025-03-22",
    status: "Active",
    lastLogin: "2025-07-26"
  },
  {
    id: 3,
    name: "Roberto Garcia",
    email: "roberto.garcia@email.com",
    role: "BusinessOwner",
    businessCount: 2,
    joinDate: "2025-02-10",
    status: "Inactive",
    lastLogin: "2025-07-20"
  },
  {
    id: 4,
    name: "Ana Rodriguez",
    email: "ana.rodriguez@email.com",
    role: "BusinessOwner",
    businessCount: 5,
    joinDate: "2024-12-08",
    status: "Active",
    lastLogin: "2025-07-28"
  },
  {
    id: 5,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    role: "LGU",
    businessCount: 0,
    joinDate: "2024-11-15",
    status: "Active",
    lastLogin: "2025-07-28"
  }
];

const quickActions = [
  { title: "Add New User", icon: UserPlus, action: "add-user" },
  { title: "Generate Business Report", icon: FileText, action: "generate-report" },
  { title: "View Analytics Dashboard", icon: BarChart3, action: "view-analytics" },
  { title: "Export Data", icon: Download, action: "export-data" },
  { title: "Schedule Review", icon: Calendar, action: "schedule-review" }
];

export default function UserPage() {
  const theme = useTheme();

  const StatCard = ({ title, value, icon: Icon, change }: { 
    title: string; 
    value: string | number; 
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    change?: string;
  }) => (
    <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p style={{ color: theme.colors.mutedText }} className="text-sm font-medium">
              {title}
            </p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className="text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" style={{ color: theme.colors.secondary }} />
                <span style={{ color: theme.colors.secondary }}>{change}</span>
              </p>
            )}
          </div>
          <Icon className="h-8 w-8" style={{ color: theme.colors.primary }} />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DefaultLayout>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <DashboardShell>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: theme.colors.text }}>
                    User Management
                  </h1>
                  <p style={{ color: theme.colors.mutedText }}>
                    Monitor business activities and generate reports
                  </p>
                </div>
                <Button 
                  style={{ 
                    backgroundColor: theme.colors.primary, 
                    color: theme.colors.background 
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                  title="Total Users" 
                  value={lguStats.totalUsers.toLocaleString()} 
                  icon={Users}
                  change="+8% from last month"
                />
                <StatCard 
                  title="Total Businesses" 
                  value={lguStats.totalBusinesses.toLocaleString()} 
                  icon={Building2}
                  change="+12% from last month"
                />
                <StatCard 
                  title="Active Applications" 
                  value={lguStats.activeApplications} 
                  icon={Users}
                  change="+5% from last week"
                />
                <StatCard 
                  title="Approved This Month" 
                  value={lguStats.approvedThisMonth} 
                  icon={TrendingUp}
                  change="+18% from last month"
                />
                <StatCard 
                  title="Pending Reviews" 
                  value={lguStats.pendingReviews} 
                  icon={FileText}
                />
                <StatCard 
                  title="Zoning Requests" 
                  value={lguStats.zoningRequests} 
                  icon={MapPin}
                />
              </div>

              {/* Quick Actions */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center justify-center gap-2"
                        style={{ 
                          borderColor: theme.colors.tertiary,
                          color: theme.colors.text
                        }}
                      >
                        <action.icon className="h-6 w-6" style={{ color: theme.colors.primary }} />
                        <span className="text-sm text-center">{action.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Management */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>User Management</CardTitle>
                    <Button 
                      style={{ 
                        backgroundColor: theme.colors.primary, 
                        color: theme.colors.background 
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ borderBottomColor: theme.colors.tertiary }}>
                        <TableHead style={{ color: theme.colors.text }}>Name</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Email</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Role</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Businesses</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Status</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Last Login</TableHead>
                        <TableHead style={{ color: theme.colors.text }}>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.map((user) => (
                        <TableRow key={user.id} style={{ borderBottomColor: theme.colors.tertiary }}>
                          <TableCell style={{ color: theme.colors.text }}>
                            <div className="font-medium">{user.name}</div>
                          </TableCell>
                          <TableCell style={{ color: theme.colors.mutedText }}>
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              style={{
                                borderColor: theme.colors.tertiary,
                                color: theme.colors.text
                              }}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ color: theme.colors.text }}>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" style={{ color: theme.colors.primary }} />
                              {user.businessCount}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={user.status === "Active" ? "default" : "secondary"}
                              style={{
                                backgroundColor: user.status === "Active" 
                                  ? theme.colors.primary 
                                  : theme.colors.secondary,
                                color: theme.colors.background
                              }}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ color: theme.colors.mutedText }}>
                            {user.lastLogin}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Recent Reports */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div 
                        key={report.id} 
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: `${theme.colors.tertiary}20` }}
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="h-5 w-5" style={{ color: theme.colors.primary }} />
                          <div>
                            <h4 className="font-medium" style={{ color: theme.colors.text }}>
                              {report.title}
                            </h4>
                            <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                              {report.type} • {report.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={report.status === "Complete" ? "default" : "secondary"}
                            style={{
                              backgroundColor: report.status === "Complete" 
                                ? theme.colors.primary 
                                : theme.colors.secondary,
                              color: theme.colors.background
                            }}
                          >
                            {report.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </DashboardShell>
        </div>
      </div>
      <ChatButton />
    </DefaultLayout>
  );
}
