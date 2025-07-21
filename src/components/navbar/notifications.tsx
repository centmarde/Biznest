import React from "react";
import { Bell, CheckSquare, CheckCircle, AlertCircle, InfoIcon, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import theme from "@/theme/theme";

type NotificationType = "info" | "warning" | "success";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

interface NotificationsProps {
  onClose?: () => void;
}

const NotificationsComponent: React.FC<NotificationsProps> = ({ onClose }) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "System Update",
      message: "System will be updated tomorrow at 2:00 PM",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
    {
      id: "2",
      title: "New User Registered",
      message: "John Doe has registered a new account",
      time: "Yesterday",
      type: "success",
      read: false,
    },
    {
      id: "3",
      title: "Server Warning",
      message: "High CPU usage detected on main server",
      time: "2 days ago",
      type: "warning",
      read: true,
    },
    {
      id: "4",
      title: "Backup Completed",
      message: "Weekly backup completed successfully",
      time: "3 days ago",
      type: "success",
      read: true,
    },
  ]);
  
  // State to track if drawer is expanded
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  
  // Determine which notifications to show based on expanded state
  const displayedNotifications = isExpanded 
    ? notifications 
    : notifications.filter(n => !n.read).slice(0, 2);
  
  const hasMoreNotifications = notifications.length > displayedNotifications.length;

  return (
    <div
      className="p-4 rounded-lg max-w-md"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" style={{ color: theme.colors.primary }} />
          <h3
            className="text-lg font-medium"
            style={{ color: theme.colors.text }}
          >
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={markAllAsRead}
              title="Mark all as read"
            >
              <CheckSquare className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 rounded-md cursor-pointer"
              style={{
                backgroundColor: notification.read
                  ? theme.colors.tertiary
                  : theme.colors.secondary + "30",
                borderLeft: `3px solid ${
                  notification.type === "info"
                    ? "#3b82f6"
                    : notification.type === "warning"
                    ? "#f59e0b"
                    : "#10b981"
                }`,
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex gap-3">
                <div className="mt-1">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {notification.title}
                    {!notification.read && (
                      <span className="inline-block ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <p
                    className="text-xs mb-2"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {notification.message}
                  </p>
                  <span
                    className="text-xs"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center py-6"
            style={{ color: theme.colors.mutedText }}
          >
            <p>No notifications</p>
          </div>
        )}
      </div>

      {/* Toggle expand/collapse button */}
      {hasMoreNotifications || isExpanded ? (
        <div className="mt-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Show all ({notifications.length})</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationsComponent;
