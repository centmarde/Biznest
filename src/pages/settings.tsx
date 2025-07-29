import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { DashboardShell } from "@/components/home/dashboardshell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Bell, 
  Globe, 
  Database,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import ChatButton from "@/components/AIrelated/ChatButton";

// Mock data for settings
const notificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  businessApplications: true,
  systemUpdates: false,
  weeklyReports: true,
  urgentAlerts: true
};

const systemSettings = {
  autoBackup: true,
  dataRetention: "12 months",
  maintenanceWindow: "2:00 AM - 4:00 AM",
  apiRateLimit: "1000 requests/hour",
  sessionTimeout: "30 minutes"
};

const integrationSettings = [
  {
    name: "Google Maps API",
    status: "Connected",
    lastSync: "2025-07-29 08:30 AM",
    active: true
  },
  {
    name: "Payment Gateway",
    status: "Connected",
    lastSync: "2025-07-29 07:15 AM",
    active: true
  },
  {
    name: "Email Service",
    status: "Disconnected",
    lastSync: "2025-07-27 03:22 PM",
    active: false
  },
  {
    name: "SMS Service",
    status: "Connected",
    lastSync: "2025-07-29 09:45 AM",
    active: true
  }
];

const recentBackups = [
  {
    id: 1,
    name: "Full System Backup",
    date: "2025-07-29 02:00 AM",
    size: "2.4 GB",
    status: "Complete"
  },
  {
    id: 2,
    name: "Database Backup",
    date: "2025-07-28 02:00 AM",
    size: "856 MB",
    status: "Complete"
  },
  {
    id: 3,
    name: "User Data Backup",
    date: "2025-07-27 02:00 AM",
    size: "1.2 GB",
    status: "Complete"
  }
];

export default function SettingsPage() {
  const theme = useTheme();

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
                    Settings
                  </h1>
                  <p style={{ color: theme.colors.mutedText }}>
                    Manage system preferences and configurations
                  </p>
                </div>
                <Button 
                  style={{ 
                    backgroundColor: theme.colors.primary, 
                    color: theme.colors.background 
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              {/* Notification Settings */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Email Notifications</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.emailNotifications} />
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Push Notifications</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Browser push notifications
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.pushNotifications} />
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Business Applications</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Notify when new business applications are submitted
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.businessApplications} />
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>System Updates</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Get notified about system maintenance and updates
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.systemUpdates} />
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Weekly Reports</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Receive weekly activity reports
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.weeklyReports} />
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Urgent Alerts</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Critical system alerts and security notifications
                      </p>
                    </div>
                    <Switch defaultChecked={notificationSettings.urgentAlerts} />
                  </div>
                </CardContent>
              </Card>

              {/* System Configuration */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label style={{ color: theme.colors.text }}>Data Retention Period</Label>
                      <Input 
                        defaultValue={systemSettings.dataRetention}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.tertiary,
                          color: theme.colors.text
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label style={{ color: theme.colors.text }}>Maintenance Window</Label>
                      <Input 
                        defaultValue={systemSettings.maintenanceWindow}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.tertiary,
                          color: theme.colors.text
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label style={{ color: theme.colors.text }}>API Rate Limit</Label>
                      <Input 
                        defaultValue={systemSettings.apiRateLimit}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.tertiary,
                          color: theme.colors.text
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label style={{ color: theme.colors.text }}>Session Timeout</Label>
                      <Input 
                        defaultValue={systemSettings.sessionTimeout}
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.tertiary,
                          color: theme.colors.text
                        }}
                      />
                    </div>
                  </div>
                  <Separator style={{ borderColor: theme.colors.tertiary }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label style={{ color: theme.colors.text }}>Automatic Backup</Label>
                      <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                        Enable daily automatic system backups
                      </p>
                    </div>
                    <Switch defaultChecked={systemSettings.autoBackup} />
                  </div>
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    External Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {integrationSettings.map((integration, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: `${theme.colors.tertiary}20` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: theme.colors.primary }}>
                            <Globe className="h-5 w-5" style={{ color: theme.colors.background }} />
                          </div>
                          <div>
                            <h4 className="font-medium" style={{ color: theme.colors.text }}>
                              {integration.name}
                            </h4>
                            <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                              Last sync: {integration.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant={integration.status === "Connected" ? "default" : "secondary"}
                            style={{
                              backgroundColor: integration.status === "Connected" 
                                ? theme.colors.primary 
                                : theme.colors.secondary,
                              color: theme.colors.background
                            }}
                          >
                            {integration.status}
                          </Badge>
                          <Switch defaultChecked={integration.active} />
                          <Button size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Backup & Data Management */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    Backup & Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Button 
                        style={{ 
                          backgroundColor: theme.colors.primary, 
                          color: theme.colors.background 
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Restore Backup
                      </Button>
                      <Button variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                    
                    <Separator style={{ borderColor: theme.colors.tertiary }} />
                    
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: theme.colors.text }}>
                        Recent Backups
                      </h4>
                      <div className="space-y-3">
                        {recentBackups.map((backup) => (
                          <div 
                            key={backup.id}
                            className="flex items-center justify-between p-3 rounded-lg"
                            style={{ backgroundColor: `${theme.colors.tertiary}10` }}
                          >
                            <div className="flex items-center gap-3">
                              <Database className="h-4 w-4" style={{ color: theme.colors.primary }} />
                              <div>
                                <p className="font-medium" style={{ color: theme.colors.text }}>
                                  {backup.name}
                                </p>
                                <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                                  {backup.date} • {backup.size}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                style={{
                                  backgroundColor: theme.colors.primary,
                                  color: theme.colors.background
                                }}
                              >
                                {backup.status}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Warning */}
              <Card style={{ 
                backgroundColor: theme.colors.background, 
                color: theme.colors.text,
                border: `1px solid ${theme.colors.secondary}`
              }}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-0.5" style={{ color: theme.colors.secondary }} />
                    <div>
                      <h4 className="font-medium" style={{ color: theme.colors.text }}>
                        Security Notice
                      </h4>
                      <p className="text-sm mt-1" style={{ color: theme.colors.mutedText }}>
                        Changes to system settings may affect application security and performance. 
                        Please review all changes carefully before saving.
                      </p>
                    </div>
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
