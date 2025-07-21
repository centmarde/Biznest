import React, { useState } from 'react';
import theme from '../../theme/theme';
import { Map, Landmark, Droplets, PlusSquare, HelpCircle } from 'lucide-react';
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
  currentMapType,
  biznestVisible,
  floodVisible,
  onSwitchToStandard,
  onToggleBiznest,
  onToggleFlood,
  onAddBiznest,
  onHelp,
}) => {
  const { colors } = theme;
  const [isBiznestDialogOpen, setIsBiznestDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  const handleToggleBiznest = () => {
    onToggleBiznest();
    if (currentMapType === 'standard' && !biznestVisible) {
      setIsBiznestDialogOpen(true);
    }
  };

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
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'standard' ? colors.primary : 'white',
              color: currentMapType === 'standard' ? colors.background : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={onSwitchToStandard}
          >
            <Map size={18} />
            Standard Map
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'biznest' || (currentMapType === 'standard' && biznestVisible) 
                ? colors.primary 
                : 'white',
              color: currentMapType === 'biznest' || (currentMapType === 'standard' && biznestVisible)
                ? colors.background 
                : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={handleToggleBiznest}
          >
            <Landmark size={18} />
            Biznest Sites {biznestVisible ? '(Visible)' : '(Hidden)'}
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2"
            style={{
              backgroundColor: currentMapType === 'flood' || (currentMapType === 'standard' && floodVisible) 
                ? colors.primary 
                : 'white',
              color: currentMapType === 'flood' || (currentMapType === 'standard' && floodVisible)
                ? colors.background 
                : colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={onToggleFlood}
          >
            <Droplets size={18} />
            Flood Zones {floodVisible ? '(Visible)' : '(Hidden)'}
          </button>
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
              backgroundColor: 'white',
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
