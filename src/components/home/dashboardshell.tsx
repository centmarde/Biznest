import type React from "react"


interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return <div 
    className="flex-1 space-y-4 p-4 pt-6 md:p-8" 
    
    {...props}
  >
    {children}
  </div>
}
