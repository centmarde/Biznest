"use client"

import * as React from "react"
import {  MapPinned, Home,  Settings, Users, ChevronDown, ChevronUp, Building2 } from "lucide-react"
import { ThemeSwitcher } from "@/theme/ThemeSwitcher"
import { useTheme } from "@/theme/theme"
import { useNavigate, useLocation } from "react-router-dom"
import { useUserAuth } from "@/auth/userAuth";

interface NavItemsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  className?: string;
  padding?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  children?: { id: string; label: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/home",
  },
  {
    id: "biznest-form",
    label: "Business Setup",
    icon: Building2,
    href: "/biznest/startingform",
  },
  {
    id: "maps",
    label: "Maps",
    icon: MapPinned,
    href: "#",
    children: [
      {
        id: "maps-view",
        label: "View Map",
        href: "/maps/view",
      },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    href: "/user",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "#",
    children: [
      {
        id: "settings-account",
        label: "Account",
        href: "/account",
      },
      {
        id: "settings-security",
        label: "Security",
        href: "/settings", 
      },
      {
        id: "settings-theme",
        label: "Theme",
        href: "/settings",
      },
    ],
  },
]

export default function NavItems({ activeTab: _activeTab, onTabClick, className = "", padding = "px-2" }: NavItemsProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const role = useUserAuth().role;

  // Determine active tab from location
  const getActiveTabFromLocation = React.useCallback(() => {
    // Try to match current pathname to navItems or their children
    for (const item of navItems) {
      if (item.href !== "#" && location.pathname.startsWith(item.href)) {
        return item.id;
      }
      if (item.children) {
        for (const child of item.children) {
          if (child.href !== "#" && location.pathname.startsWith(child.href)) {
            return child.id;
          }
        }
      }
    }
    return "";
  }, [location.pathname]);

  const activeTab = _activeTab || getActiveTabFromLocation();

  // Filter navItems based on role
  const filteredNavItems = React.useMemo(() => {
    if (role === "LGU") {
      return navItems.filter(item => ["dashboard", "users", "settings", "maps"].includes(item.id));
    } else if (role === "BusinessOwner") {
      return navItems.filter(item => ["biznest-form", "settings", "startingform"].includes(item.id));
    }
    return [];
  }, [role]);

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);
  const isChildActive = (item: NavItem) => {
    if (!item.children) return false;
    return activeTab === item.id || item.children.some(child => activeTab === child.id);
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleExpand(item.id);
    } else {
      if (onTabClick) onTabClick(item.id);
      navigate(item.href);
    }
  };

  const handleChildClick = (child: { id: string; href: string }) => {
    if (onTabClick) onTabClick(child.id);
    navigate(child.href);
  };

  return (
    <nav className={`flex flex-col ${padding} ${className}`}>
      {filteredNavItems.map((item) => (
        <div key={item.id} className="mb-1">
          <div
            className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors"
            style={{
              backgroundColor: (activeTab === item.id || isChildActive(item)) ? theme.colors.primary : 'transparent',
              color: (activeTab === item.id || isChildActive(item)) ? theme.colors.background : theme.colors.text
            }}
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </div>
            {item.children && (
              isExpanded(item.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </div>

          {/* Settings children: inject ThemeSwitcher for Theme */}
          {item.children && isExpanded(item.id) && (
            <div className="ml-4 pl-4 mt-1" style={{ borderLeft: `1px solid ${theme.colors.tertiary}` }}>
              {item.id === "settings" ? (
                <>
                  {item.children.map((child) => (
                    child.id === "settings-theme" ? (
                      <div key={child.id} className="flex items-center gap-3 px-4 py-2 my-1">
                        <ThemeSwitcher />
                        <span>{child.label}</span>
                      </div>
                    ) : (
                      <div
                        key={child.id}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors my-1"
                        style={{
                          backgroundColor: activeTab === child.id ? theme.colors.primary : 'transparent',
                          color: activeTab === child.id ? theme.colors.background : theme.colors.text
                        }}
                        onClick={() => handleChildClick(child)}
                      >
                        <span>{child.label}</span>
                      </div>
                    )
                  ))}
                </>
              ) : (
                item.children.map((child) => (
                  <div
                    key={child.id}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors my-1"
                    style={{
                      backgroundColor: activeTab === child.id ? theme.colors.primary : 'transparent',
                      color: activeTab === child.id ? theme.colors.background : theme.colors.text
                    }}
                    onClick={() => handleChildClick(child)}
                  >
                    <span>{child.label}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

// Export the function to get current active item
export function getActiveItem(activeTab: string) {
  return navItems.find(item => item.id === activeTab);
}
