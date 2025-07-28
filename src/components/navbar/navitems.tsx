"use client"

import * as React from "react"
import {  MapPinned, Home,  Settings, Users, ChevronDown, ChevronUp, Building2 } from "lucide-react"
import { ThemeSwitcher } from "@/theme/ThemeSwitcher"
import { useTheme } from "@/theme/theme"
import { useNavigate } from "react-router-dom"
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
    href: "/biznest/form",
  },
  /* {
    id: "packages",
    label: "Packages",
    icon: Gift,
    href: "/packages",
  }, */
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
     /*  {
        id: "maps-ai",
        label: "Map with AI",
        href: "/maps/ai",
      }, */
    ],
  },
 /*  {
    id: "maintenance",
    label: "Maintenance",
    icon: Tool,
    href: "/maintenance",
  },
  {
    id: "3dmodels",
    label: "3dModels",
    icon: Box3d,
    href: "/models",
  }, */
  {
    id: "users",
    label: "Users",
    icon: Users,
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
        href: "#",
      },
      {
        id: "settings-security",
        label: "Security",
        href: "#", 
      },
      {
        id: "settings-theme",
        label: "Theme",
        href: "#",
      },
    ],
  },
]

export default function NavItems({ activeTab, onTabClick, className = "", padding = "px-2" }: NavItemsProps) {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  // Use Zustand hook to get role
  const role = useUserAuth().role;

  // Filter navItems based on role
  const filteredNavItems = React.useMemo(() => {
    if (role === "LGU") {
      // LGU: show Dashboard, Users, Settings
      return navItems.filter(item => ["dashboard", "users", "settings", "maps"].includes(item.id));
    } else if (role === "BusinessOwner") {
      // BusinessOwner: show Business Setup, Maps, Settings
      return navItems.filter(item => ["biznest-form",  "settings"].includes(item.id));
    }
    // Default: show nothing
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
    return item.children.some(child => activeTab === child.id);
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleExpand(item.id);
    } else {
      onTabClick(item.id);
      navigate(item.href);
    }
  };

  const handleChildClick = (child: { id: string; href: string }) => {
    onTabClick(child.id);
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
  )
}

// Export the function to get current active item
export function getActiveItem(activeTab: string) {
  return navItems.find(item => item.id === activeTab);
}
