"use client"

import * as React from "react"
import { Bell, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import theme from "@/theme/theme"
import Logo from "@/components/ui/logo"
import NotificationsComponent from "@/components/navbar/notifications"
import NavItems, { getActiveItem } from "@/components/navbar/navitems"
import { useNavigate } from "react-router-dom"
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

interface MainSidebarProps extends React.ComponentPropsWithoutRef<"div"> {
  isMobile?: boolean;
}

export function MainSidebar({ isMobile = false, className, ...props }: MainSidebarProps) {
  const [activeTab, setActiveTab] = React.useState("dashboard")
  const [notificationCount, setNotificationCount] = React.useState(3)
  const [isOpen, setIsOpen] = React.useState(false)
  const [showNotifications, setShowNotifications] = React.useState(false)
  const navigate = useNavigate()
  
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  
  // Create refs for scroll containers
  const desktopScrollRef = React.useRef<HTMLDivElement>(null);
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);
  
  // Store PerfectScrollbar instances
  const psInstanceRef = React.useRef<PerfectScrollbar | null>(null);
  const mobilePsInstanceRef = React.useRef<PerfectScrollbar | null>(null);
  
  // Initialize perfect scrollbar after component mounts
  React.useEffect(() => {
    // Clean up previous instances
    if (psInstanceRef.current) {
      psInstanceRef.current.destroy();
      psInstanceRef.current = null;
    }
    
    if (mobilePsInstanceRef.current) {
      mobilePsInstanceRef.current.destroy();
      mobilePsInstanceRef.current = null;
    }
    
    // Small timeout to ensure DOM is fully rendered
    setTimeout(() => {
      // Initialize desktop scrollbar
      if (desktopScrollRef.current && !isMobile) {
        psInstanceRef.current = new PerfectScrollbar(desktopScrollRef.current, {
          wheelSpeed: 2,
          wheelPropagation: false,
          minScrollbarLength: 20
        });
      }
      
      // Initialize mobile drawer scrollbar
      if (mobileScrollRef.current && isMobile && drawerOpen) {
        mobilePsInstanceRef.current = new PerfectScrollbar(mobileScrollRef.current, {
          wheelSpeed: 2,
          wheelPropagation: false,
          minScrollbarLength: 20
        });
      }
    }, 100);
    
    // Cleanup function
    return () => {
      if (psInstanceRef.current) {
        psInstanceRef.current.destroy();
        psInstanceRef.current = null;
      }
      
      if (mobilePsInstanceRef.current) {
        mobilePsInstanceRef.current.destroy();
        mobilePsInstanceRef.current = null;
      }
    };
  }, [isMobile, drawerOpen]); // Re-initialize when isMobile or drawerOpen changes

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (isMobile) setIsOpen(false)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    setNotificationCount(0)
  }

  const handleLogoutClick = () => {
  /*   navigate("/exit") */
    navigate("/")
  }

  // Get the current active item
  const activeItem = getActiveItem(activeTab);

  if (isMobile) {
    return (
      <>
        {/* Mobile header with burger menu */}
        <div 
          className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-3"
          style={{ 
            backgroundColor: theme.colors.background, 
            borderBottom: `1px solid ${theme.colors.tertiary}`
          }}
          {...props}
        >
          {/* Burger menu button */}
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(!drawerOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Page title instead of breadcrumbs */}
          <h2 className="text-base font-medium" style={{ color: theme.colors.text }}>
            {activeItem?.label || 'Dashboard'}
          </h2>
          
          {/* Notification button */}
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <div className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-bold">
                  {notificationCount}
                </span>
              )}
            </div>
          </Button>
        </div>

        {/* Mobile drawer overlay */}
        {drawerOpen && (
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-30"
            onClick={() => setDrawerOpen(false)}
          />
        )}
        
        {/* Mobile sidebar drawer */}
        <div 
          className={`fixed top-0 left-0 bottom-0 w-[260px] z-40 transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
          style={{ backgroundColor: theme.colors.background }}
        >
          <div className="flex justify-between items-center p-4" style={{ borderBottom: `1px solid ${theme.colors.tertiary}` }}>
            <Logo size="small" />
            <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div ref={mobileScrollRef} className="overflow-y-auto h-[calc(100%-60px)] position-relative">
            <NavItems 
              activeTab={activeTab} 
              onTabClick={(id) => {
                handleTabClick(id);
                setDrawerOpen(false);
              }}
              padding="p-2"
            />
          </div>
          
          <div className="absolute bottom-0 w-full p-4" style={{ borderTop: `1px solid ${theme.colors.tertiary}` }}>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogoutClick}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        
        {/* Notifications dropdown for mobile */}
        {showNotifications && (
          <div className="fixed top-14 right-2 z-50 shadow-lg rounded-lg overflow-hidden border" style={{ borderColor: theme.colors.tertiary }}>
            <NotificationsComponent onClose={() => setShowNotifications(false)} />
          </div>
        )}
        
        {/* Content area padding to account for fixed header and tabs */}
        <div className="pt-[104px]" /> {/* 56px for header + 48px for tabs */}
      </>
    );
  }
  
  return (
    <div 
      className="flex flex-col h-screen w-[280px] overflow-hidden" 
      style={{ 
        backgroundColor: theme.colors.background, 
        borderRight: `1px solid ${theme.colors.tertiary}`,
        zIndex: 20
      }}
      {...props}
    >
      <div className="p-4 flex justify-center" style={{ color: theme.colors.primary }}>
        <Logo />
      </div>
      <div ref={desktopScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden">
        <NavItems 
          activeTab={activeTab} 
          onTabClick={handleTabClick} 
        />
        
        {/* Notifications section below tabs */}
        <div className="mt-4 px-2">
          <NotificationsComponent />
        </div>
      </div>
      
      <div className="p-4" style={{ borderTop: `1px solid ${theme.colors.tertiary}` }}>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogoutClick}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: theme.colors.secondary }}></div>
    </div>
  )
}

export default MainSidebar;
