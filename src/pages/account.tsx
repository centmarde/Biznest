import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { DashboardShell } from "@/components/home/dashboardshell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Shield,
  Key,
  Camera,
  Edit3,
  Save,
  Lock,
  Eye,
  EyeOff,
  Activity,
  Clock
} from "lucide-react";
import ChatButton from "@/components/AIrelated/ChatButton";
import { useState } from "react";

// Mock user data
const userData = {
  id: "LGU001",
  name: "Maria Gonzales",
  email: "maria.gonzales@lgu.gov.ph",
  phone: "+63 912 345 6789",
  position: "Business Permits Officer",
  department: "Business & Trade Development",
  location: "Quezon City, Metro Manila",
  joinDate: "2023-08-15",
  lastLogin: "2025-07-29 08:30 AM",
  status: "Active",
  role: "LGU Administrator",
  profileImage: "/public/misc/sign-in.png"
};

const accountActivity = [
  {
    id: 1,
    action: "Logged in",
    timestamp: "2025-07-29 08:30 AM",
    device: "Windows Desktop",
    location: "Quezon City, Philippines"
  },
  {
    id: 2,
    action: "Updated user permissions",
    timestamp: "2025-07-28 03:45 PM",
    device: "Windows Desktop",
    location: "Quezon City, Philippines"
  },
  {
    id: 3,
    action: "Generated business report",
    timestamp: "2025-07-28 10:20 AM",
    device: "Windows Desktop",
    location: "Quezon City, Philippines"
  },
  {
    id: 4,
    action: "Approved business application",
    timestamp: "2025-07-27 02:15 PM",
    device: "Mobile App",
    location: "Quezon City, Philippines"
  },
  {
    id: 5,
    action: "Changed password",
    timestamp: "2025-07-25 09:00 AM",
    device: "Windows Desktop",
    location: "Quezon City, Philippines"
  }
];

const securitySettings = {
  twoFactorEnabled: true,
  lastPasswordChange: "2025-07-25",
  sessionTimeout: "30 minutes",
  loginAlerts: true
};

export default function AccountPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
                    Account Settings
                  </h1>
                  <p style={{ color: theme.colors.mutedText }}>
                    Manage your profile and account preferences
                  </p>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ 
                    backgroundColor: theme.colors.primary, 
                    color: theme.colors.background 
                  }}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              {/* Profile Information */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-32 w-32">
                          <img 
                            src={userData.profileImage} 
                            alt={userData.name}
                            className="object-cover w-full h-full rounded-full"
                          />
                        </Avatar>
                        {isEditing && (
                          <Button 
                            size="sm" 
                            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                            style={{ 
                              backgroundColor: theme.colors.primary, 
                              color: theme.colors.background 
                            }}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="text-center">
                        <Badge 
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.background
                          }}
                        >
                          {userData.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Full Name</Label>
                          <Input 
                            defaultValue={userData.name}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Employee ID</Label>
                          <Input 
                            defaultValue={userData.id}
                            disabled
                            style={{
                              backgroundColor: `${theme.colors.tertiary}20`,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.mutedText
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Email Address</Label>
                          <Input 
                            defaultValue={userData.email}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Phone Number</Label>
                          <Input 
                            defaultValue={userData.phone}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Position</Label>
                          <Input 
                            defaultValue={userData.position}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label style={{ color: theme.colors.text }}>Department</Label>
                          <Input 
                            defaultValue={userData.department}
                            disabled={!isEditing}
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label style={{ color: theme.colors.text }}>Office Location</Label>
                        <Input 
                          defaultValue={userData.location}
                          disabled={!isEditing}
                          style={{
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" style={{ color: theme.colors.primary }} />
                          <span className="text-sm" style={{ color: theme.colors.mutedText }}>
                            Joined {userData.joinDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" style={{ color: theme.colors.primary }} />
                          <span className="text-sm" style={{ color: theme.colors.mutedText }}>
                            Last login: {userData.lastLogin}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <h4 className="font-medium" style={{ color: theme.colors.text }}>
                      Change Password
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label style={{ color: theme.colors.text }}>Current Password</Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            style={{
                              backgroundColor: theme.colors.background,
                              borderColor: theme.colors.tertiary,
                              color: theme.colors.text
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label style={{ color: theme.colors.text }}>New Password</Label>
                        <Input 
                          type="password"
                          placeholder="Enter new password"
                          style={{
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label style={{ color: theme.colors.text }}>Confirm Password</Label>
                        <Input 
                          type="password"
                          placeholder="Confirm new password"
                          style={{
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        />
                      </div>
                    </div>
                    <Button 
                      style={{ 
                        backgroundColor: theme.colors.secondary, 
                        color: theme.colors.background 
                      }}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>

                  <Separator style={{ borderColor: theme.colors.tertiary }} />

                  {/* Security Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium" style={{ color: theme.colors.text }}>
                        Security Status
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span style={{ color: theme.colors.text }}>Two-Factor Authentication</span>
                          <Badge 
                            style={{
                              backgroundColor: securitySettings.twoFactorEnabled 
                                ? theme.colors.primary 
                                : theme.colors.secondary,
                              color: theme.colors.background
                            }}
                          >
                            {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span style={{ color: theme.colors.text }}>Login Alerts</span>
                          <Badge 
                            style={{
                              backgroundColor: securitySettings.loginAlerts 
                                ? theme.colors.primary 
                                : theme.colors.secondary,
                              color: theme.colors.background
                            }}
                          >
                            {securitySettings.loginAlerts ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span style={{ color: theme.colors.text }}>Session Timeout</span>
                          <span style={{ color: theme.colors.mutedText }}>
                            {securitySettings.sessionTimeout}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span style={{ color: theme.colors.text }}>Last Password Change</span>
                          <span style={{ color: theme.colors.mutedText }}>
                            {securitySettings.lastPasswordChange}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium" style={{ color: theme.colors.text }}>
                        Security Actions
                      </h4>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          style={{
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Configure Two-Factor Auth
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          style={{
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Manage Login Sessions
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          style={{
                            borderColor: theme.colors.tertiary,
                            color: theme.colors.text
                          }}
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          Download Security Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Activity */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" style={{ color: theme.colors.primary }} />
                    Recent Account Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accountActivity.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ backgroundColor: `${theme.colors.tertiary}20` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full flex items-center justify-center"
                               style={{ backgroundColor: theme.colors.primary }}>
                            <Activity className="h-5 w-5" style={{ color: theme.colors.background }} />
                          </div>
                          <div>
                            <h4 className="font-medium" style={{ color: theme.colors.text }}>
                              {activity.action}
                            </h4>
                            <p className="text-sm" style={{ color: theme.colors.mutedText }}>
                              {activity.device} • {activity.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <User className="h-8 w-8 mx-auto mb-2" style={{ color: theme.colors.primary }} />
                      <p className="font-medium" style={{ color: theme.colors.text }}>Role</p>
                      <p style={{ color: theme.colors.mutedText }}>{userData.role}</p>
                    </div>
                    <div className="text-center">
                      <Mail className="h-8 w-8 mx-auto mb-2" style={{ color: theme.colors.primary }} />
                      <p className="font-medium" style={{ color: theme.colors.text }}>Verified Email</p>
                      <p style={{ color: theme.colors.mutedText }}>✓ Verified</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2" style={{ color: theme.colors.primary }} />
                      <p className="font-medium" style={{ color: theme.colors.text }}>Location</p>
                      <p style={{ color: theme.colors.mutedText }}>Philippines</p>
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
