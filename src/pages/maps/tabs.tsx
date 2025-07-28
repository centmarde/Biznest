import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';
import { PlusSquare, HelpCircle } from 'lucide-react';
import AddBiznestDialog from './dialogs/add_biznest';
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

  return (
    <>
      <div className="flex mb-4 justify-between">
        <div className="flex gap-4">
       
        </div>
        
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: colors.secondary,
              color: 'white',
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleAddBiznest}
          >
            <PlusSquare size={18} />
            Add Biznest
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
             
              color: colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleHelp}
          >
            <HelpCircle size={18} />
            Help
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
