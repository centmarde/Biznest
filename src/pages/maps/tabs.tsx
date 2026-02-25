import React from 'react';
import { useIsMobile } from '../../utils/mobile';
import { useTheme } from '../../theme/theme';
import { PlusSquare, BarChart2, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const navigate = useNavigate();
  
  
  const handleAddBiznest = () => {
    if (onAddBiznest) {
      onAddBiznest();
    }
    navigate('/maps/ai');
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
                  navigate('/new-stats/statistics');
                }}
              >
                <BarChart2 size={isMobile ? 14 : 18} />
                {isMobile ? 'New Stats' : 'New Businesses Statistics'}
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
                  navigate('/old-stats/statistics');
                }}
              >
                <Building2 size={isMobile ? 14 : 18} />
                {isMobile ? 'Old Stats' : 'Old Businesses Statistics'}
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
            </div>
      </div>
    </>
  );
};

export default MapTabs;
