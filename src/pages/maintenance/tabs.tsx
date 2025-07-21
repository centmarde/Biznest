"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme/theme"

interface TabsProps {
  biznestMaintenanceComponent: React.ReactNode;
  addBiznestComponent: React.ReactNode;
}

export default function MaintenanceTabs({ 
  biznestMaintenanceComponent, 
  addBiznestComponent 
}: TabsProps) {
  const theme = useTheme();
  const { colors } = theme;
  const [activeTab, setActiveTab] = useState<'biznest-maintenance' | 'add-biznest'>('biznest-maintenance');
  
  return (
    <div className="w-full">
      <div className="flex mb-4 justify-end">
        <div className="flex gap-2">
          <Button 
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{ 
              backgroundColor: activeTab === 'biznest-maintenance' ? colors.secondary : 'white',
              color: activeTab === 'biznest-maintenance' ? 'white' : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={() => setActiveTab('biznest-maintenance')}
          >
            Biznest Maintenance
          </Button>
          <Button 
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{ 
              backgroundColor: activeTab === 'add-biznest' ? colors.secondary : 'white',
              color: activeTab === 'add-biznest' ? 'white' : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={() => setActiveTab('add-biznest')}
          >
            Add Biznest
          </Button>
        </div>
      </div>
      
      {activeTab === 'biznest-maintenance' && (
        <div className="tab-content">
          {biznestMaintenanceComponent}
        </div>
      )}
      
      {activeTab === 'add-biznest' && (
        <div className="tab-content">
          {addBiznestComponent}
        </div>
      )}
    </div>
  );
}
