import { Home, Building2, MapPinned, Settings } from "lucide-react";
import { useTheme } from "@/theme/theme";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "@/auth/userAuth";
import { useIsMobile } from "@/utils/mobile";


// Import settings children from navitems.tsx
import { navItems as desktopNavItems } from "@/components/navbar/navitems";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/home" },
  { id: "biznest-form", label: "Business", icon: Building2, href: "/biznest/form" },
  { id: "maps", label: "Maps", icon: MapPinned, href: "/maps/view" },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
    children: [
      ...(desktopNavItems.find(item => item.id === "settings")?.children || []),
      { id: "logout", label: "Logout" },
    ],
  },
];


function getFilteredNavItems(role: string | null) {
  if (role === "LGU") {
    return navItems.filter(item => ["dashboard", "settings", "maps"].includes(item.id));
  } else if (role === "BusinessOwner") {
    return navItems.filter(item => ["biznest-form",  "settings"].includes(item.id));
  }
  return [];
}

interface MobileNavbarProps {
  activeTab: string;
  onTabClick?: (tabId: string) => void;
}


import React from "react";
import { ChevronUp, ChevronDown, LogOut } from "lucide-react";

export default function MobileNavbar({ activeTab, onTabClick }: MobileNavbarProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { role, logout } = useUserAuth();
  const isMobile = useIsMobile();
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // Use Zustand role, fallback to localStorage if null (matches userAuth.ts logic)
  const userRole = role || (typeof window !== 'undefined' ? localStorage.getItem('userRole') : null);
  const filteredNavItems = getFilteredNavItems(userRole);

  if (!isMobile) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-white border-t"
      style={{
        backgroundColor: theme.colors.background,
        borderTop: `1px solid ${theme.colors.tertiary}`,
      }}
    >
      {filteredNavItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        if (item.id !== "settings") {
          return (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center flex-1 h-full px-2"
              style={{
                color: isActive ? theme.colors.primary : theme.colors.text,
                background: isActive ? `${theme.colors.primary}10` : "transparent",
                borderRadius: 8,
                fontWeight: isActive ? "bold" : "normal",
              }}
              onClick={() => {
                if (onTabClick) onTabClick(item.id);
                navigate(item.href);
              }}
            >
              <Icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        } else {
          // Settings dropdown
          return (
            <div key={item.id} className="relative flex-1 flex flex-col items-center justify-center h-full px-2">
              <button
                className="flex flex-col items-center justify-center w-full h-full"
                style={{
                  color: isActive ? theme.colors.primary : theme.colors.text,
                  background: isActive ? `${theme.colors.primary}10` : "transparent",
                  borderRadius: 8,
                  fontWeight: isActive ? "bold" : "normal",
                }}
                onClick={() => setSettingsOpen((open) => !open)}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{item.label}</span>
                {settingsOpen ? <ChevronUp className="h-4 w-4 mt-1" /> : <ChevronDown className="h-4 w-4 mt-1" />}
              </button>
              {settingsOpen && (
                <div
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 px-3 min-w-[120px]"
                  style={{
                    backgroundColor: theme.colors.background,
                    border: `1px solid ${theme.colors.tertiary}`,
                    zIndex: 100,
                  }}
                >
                  {item.children?.map((child) =>
                    child.id === "logout" ? (
                      <button
                        key={child.id}
                        className="flex items-center gap-2 w-full px-2 py-2 text-left rounded hover:bg-gray-100"
                        style={{ color: theme.colors.tertiary }}
                        onClick={() => {
                          logout();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{child.label}</span>
                      </button>
                    ) : (
                      <button
                        key={child.id}
                        className="w-full px-2 py-2 text-left rounded hover:bg-gray-100"
                        style={{
                          color: activeTab === child.id ? theme.colors.primary : theme.colors.text,
                          fontWeight: activeTab === child.id ? "bold" : "normal",
                        }}
                       
                      >
                        {child.label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          );
        }
      })}
    </nav>
  );
}