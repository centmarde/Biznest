import React, { useState } from 'react';
import { useIsMobile } from '../../utils/mobile';
import { useTheme } from '../../theme/theme';
import { PlusSquare, HelpCircle, BarChart2, Building2 } from 'lucide-react';
import AddBiznestDialog from './dialogs/add_zoning';
import HelpDialog from './dialogs/help_dialog';

export type MapType = 'standard' | 'biznest' | 'flood';

interface MapTabsProps {
  currentMapType: MapType;
  biznestVisible: boolean;
  floodVisible: boolean;
  onSwitchToStandard: () => void;
  onToggleBiznest: () => void;
  onToggleFlood: () => void;
  onAddBiznest?: () => void;
  onHelp?: () => void;
}

const MapTabs: React.FC<MapTabsProps> = ({
 
  onAddBiznest,
  onHelp,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const [isBiznestDialogOpen, setIsBiznestDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  
  const handleAddBiznest = () => {
    if (onAddBiznest) {
      onAddBiznest();
    }
    setIsBiznestDialogOpen(true);
    // No longer opening help dialog here
  };

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
    setIsHelpDialogOpen(true);
  };

  const isMobile = useIsMobile();

  return (
    <>
      <div className="flex mb-4 justify-between">
        <div className="flex gap-4"></div>
        <div
          className={
            isMobile
              ? 'flex flex-wrap gap-1 justify-end w-full'
              : 'flex gap-2'
          }
        >
              <button
                className={
                  isMobile
                    ? 'px-2 py-1 rounded-md transition-all duration-200 flex items-center gap-1 text-xs'
                    : 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2'
                }
                style={{
                  backgroundColor: colors.tertiary,
                  color: colors.text,
                  border: `1px solid ${colors.secondary}`
                }}
                onClick={() => {
                  // TODO: Implement new businesses statistics logic
                  alert('Show New Businesses');
                }}
              >
                <BarChart2 size={isMobile ? 14 : 18} />
                {isMobile ? 'Show New Bus.' : 'Show New Businesses'}
              </button>

              <button
                className={
                  isMobile
                    ? 'px-2 py-1 rounded-md transition-all duration-200 flex items-center gap-1 text-xs'
                    : 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2'
                }
                style={{
                  backgroundColor: colors.tertiary,
                  color: colors.text,
                  border: `1px solid ${colors.secondary}`
                }}
                onClick={() => {
                  // TODO: Implement old businesses statistics logic
                  alert('Show Old Businesses');
                }}
              >
                <Building2 size={isMobile ? 14 : 18} />
                {isMobile ? 'Show Old.' : 'Show Old Businesses'}
              </button>

              <button
                className={
                  isMobile
                    ? 'px-2 py-1 rounded-md transition-all duration-200 flex items-center gap-1 text-xs'
                    : 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2'
                }
                style={{
                  backgroundColor: colors.secondary,
                  color: 'white',
                  border: `1px solid ${colors.tertiary}`
                }}
                onClick={handleAddBiznest}
              >
                <PlusSquare size={isMobile ? 14 : 18} />
                {isMobile ? 'Add' : 'Add Zoning'}
              </button>

              <button
                className={
                  isMobile
                    ? 'px-2 py-1 rounded-md transition-all duration-200 flex items-center gap-1 text-xs'
                    : 'px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2'
                }
                style={{
                  color: colors.text,
                  border: `1px solid ${colors.tertiary}`
                }}
                onClick={handleHelp}
              >
                <HelpCircle size={isMobile ? 14 : 18} />
                {isMobile ? 'Help' : 'Help'}
              </button>
            </div>
      </div>

      <AddBiznestDialog 
        isOpen={isBiznestDialogOpen} 
        onClose={() => setIsBiznestDialogOpen(false)}
        onConfirm={() => {
          // Handle the confirmation logic
          setIsBiznestDialogOpen(false);
        }}
        polygonId={1} // You may need to pass the actual polygon ID dynamically
      />

      <HelpDialog 
        isOpen={isHelpDialogOpen} 
        onClose={() => setIsHelpDialogOpen(false)} 
      />
    </>
  );
};

export default MapTabs;
