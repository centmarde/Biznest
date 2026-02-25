import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';
import { PlusSquare, HelpCircle } from 'lucide-react';
import AddHeritageDialog from '../maps/dialogs/add_heritage';
import HelpDialog from '../maps/dialogs/help_dialog';
import AddZoningDialog from '../maps/dialogs/add_zoning';
import AnalyzeDialog from './dialogs/analyze.tsx';

interface MapAITabsProps {
  onAddHeritage?: () => void;
  onHelp?: () => void;
  drawingEnabled?: boolean;
  onStartDrawing?: () => void;
  onCancelDrawing?: () => void;
  onUndoDrawing?: () => void;
  hasDrawnPolygon?: boolean;
}

const MapAITabs: React.FC<MapAITabsProps> = ({
  /* onAddHeritage, */
  onHelp,
  drawingEnabled,
  onStartDrawing,
  onCancelDrawing,
  onUndoDrawing,
  hasDrawnPolygon = false,
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const [isHeritageDialogOpen, setIsHeritageDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isZoningDialogOpen, setIsZoningDialogOpen] = useState(false);
  const [isAnalyzeDialogOpen, setIsAnalyzeDialogOpen] = useState(false);

  const handleHelp = () => {
    if (onHelp) {
      onHelp();
    }
    setIsHelpDialogOpen(true);
  };

  const handleAnalyze = () => {
    setIsZoningDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row mb-4 justify-between items-center gap-4 w-full">
        {/* Drawing Controls (left) */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            style={{
              ...(drawingEnabled
                ? theme.components.button.secondary.base
                : theme.components.button.primary.base),
              ...(drawingEnabled
                ? theme.components.button.secondary.hover
                : {}),
            }}
            className="w-full sm:w-auto min-w-[120px] mb-2 sm:mb-0"
            onMouseEnter={e => {
              Object.assign(
                e.currentTarget.style,
                drawingEnabled
                  ? theme.components.button.secondary.hover
                  : theme.components.button.primary.hover
              );
            }}
            onMouseLeave={e => {
              Object.assign(
                e.currentTarget.style,
                drawingEnabled
                  ? theme.components.button.secondary.base
                  : theme.components.button.primary.base
              );
            }}
            onClick={drawingEnabled ? onCancelDrawing : onStartDrawing}
          >
            {drawingEnabled ? 'Cancel Drawing' : 'Start Drawing'}
          </button>
          <button
            style={{
              ...theme.components.button.text.base,
              backgroundColor: theme.colors.tertiary,
              color: theme.colors.background,
              fontWeight: 'bold',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
            className="w-full sm:w-auto min-w-[120px]"
            onMouseEnter={e => {
              Object.assign(e.currentTarget.style, theme.components.button.text.hover);
              e.currentTarget.style.backgroundColor = theme.colors.secondary;
              e.currentTarget.style.color = theme.colors.background;
            }}
            onMouseLeave={e => {
              Object.assign(e.currentTarget.style, theme.components.button.text.base);
              e.currentTarget.style.backgroundColor = theme.colors.tertiary;
              e.currentTarget.style.color = theme.colors.background;
            }}
            onClick={onUndoDrawing}
          >
            Undo Drawing
          </button>
        </div>
        {/* Other Controls (right) */}
        <div className="flex gap-2">
          <div title={!hasDrawnPolygon ? (!drawingEnabled ? 'Click Start Drawing first, then complete a polygon' : 'Please finish drawing a polygon first') : ''}>
            <button
              className="px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2 hover:shadow-md"
              style={{
                backgroundColor: hasDrawnPolygon ? colors.secondary : colors.tertiary,
                color: colors.background,
                border: `1px solid ${hasDrawnPolygon ? colors.secondary : colors.tertiary}`,
                fontWeight: '500',
                opacity: hasDrawnPolygon ? 1 : 0.4,
                cursor: hasDrawnPolygon ? 'pointer' : 'not-allowed',
              }}
              onClick={hasDrawnPolygon ? handleAnalyze : undefined}
              onMouseEnter={(e) => {
                if (!hasDrawnPolygon) return;
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.borderColor = colors.primary;
              }}
              onMouseLeave={(e) => {
                if (!hasDrawnPolygon) return;
                e.currentTarget.style.backgroundColor = colors.secondary;
                e.currentTarget.style.borderColor = colors.secondary;
              }}
            >
              <PlusSquare size={18} />
              Analyze
            </button>
          </div>
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
      {/* Drawing status below controls */}
      <div className="mb-4 text-center">
        <span className="text-base">
          {drawingEnabled ? 'Drawing mode is enabled. Click on the map to draw a polygon.' : 'Drawing mode is disabled.'}
        </span>
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
      
      <AddZoningDialog
        isOpen={isZoningDialogOpen}
        onClose={() => setIsZoningDialogOpen(false)}
        onConfirm={() => {
          setIsZoningDialogOpen(false);
          setIsAnalyzeDialogOpen(true);
        }}
        polygonId={1}
      />

      <AnalyzeDialog
        isOpen={isAnalyzeDialogOpen}
        onClose={() => setIsAnalyzeDialogOpen(false)}
      />
    </>
  );
};

export default MapAITabs;
