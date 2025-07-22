import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';
import { PlusSquare, HelpCircle } from 'lucide-react';
import AddHeritageDialog from '../maps/dialogs/add_heritage';
import HelpDialog from '../maps/dialogs/help_dialog';
import AnalyzeDialog from './dialogs/analyze';

interface MapAITabsProps {
  onAddHeritage?: () => void;
  onHelp?: () => void;
}

const MapAITabs: React.FC<MapAITabsProps> = ({
  /* onAddHeritage, */
  onHelp,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const [isHeritageDialogOpen, setIsHeritageDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isAnalyzeDialogOpen, setIsAnalyzeDialogOpen] = useState(false);

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
    setIsHelpDialogOpen(true);
  };

  const handleAnalyze = () => {
    setIsAnalyzeDialogOpen(true);
  };

  const handleAddToAnalytics = () => {
    console.log('Added to analytics');
    setIsAnalyzeDialogOpen(false);
    // Additional logic for adding to analytics would go here
  };

  return (
    <>
      <div className="flex mb-4 justify-end">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 hover:shadow-md"
            style={{
              backgroundColor: colors.secondary,
              color: colors.background,
              border: `1px solid ${colors.secondary}`,
              fontWeight: '500'
            }}
            onClick={handleAnalyze}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
              e.currentTarget.style.borderColor = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.secondary;
              e.currentTarget.style.borderColor = colors.secondary;
            }}
          >
            <PlusSquare size={18} />
            Analyze
          </button>
          
          <button
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 hover:shadow-md"
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              border: `1px solid ${colors.tertiary}`,
              fontWeight: '500'
            }}
            onClick={handleHelp}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.tertiary;
              e.currentTarget.style.color = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.background;
              e.currentTarget.style.color = colors.text;
            }}
          >
            <HelpCircle size={18} />
            Help
          </button>
        </div>
      </div>

      <AddHeritageDialog 
        isOpen={isHeritageDialogOpen} 
        onClose={() => setIsHeritageDialogOpen(false)}
        onConfirm={() => {
          // Handle the confirmation logic
          setIsHeritageDialogOpen(false);
        }}
        polygonId={1} // You may need to pass the actual polygon ID dynamically
      />

      <HelpDialog 
        isOpen={isHelpDialogOpen} 
        onClose={() => setIsHelpDialogOpen(false)} 
      />
      
      <AnalyzeDialog
        isOpen={isAnalyzeDialogOpen}
        onClose={() => setIsAnalyzeDialogOpen(false)}
        onAddToAnalytics={handleAddToAnalytics}
      />
    </>
  );
};

export default MapAITabs;
