import type React from "react"
import { useTheme } from "@/theme/theme"

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children, ...props }: DashboardShellProps) {
  const theme = useTheme();
  
  return <div 
    className="flex-1 space-y-4 p-4 pt-6 md:p-8" 
    style={{
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}
    {...props}
  >
    {children}
  </div>
}
