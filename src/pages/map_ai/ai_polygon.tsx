import React/* , { useState } */ from 'react';
import { useTheme } from '../../theme/theme';

interface AIPolygonCreatorProps {
  onPolygonComplete?: (polygon: any) => void;
  onCancel?: () => void;
  onStartDrawing?: () => void;
  isDrawing: boolean;
}

const AIPolygonCreator: React.FC<AIPolygonCreatorProps> = ({
  // onPolygonComplete,
  onCancel,
  onStartDrawing,
  isDrawing
}) => {
  const theme = useTheme();
  const { colors } = theme;

  const handleStartDrawing = () => {
    if (onStartDrawing) {
      onStartDrawing();
    }
  };

  const handleCancelDrawing = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div 
      className="mb-4 p-4 rounded-lg border" 
      style={{ 
        borderColor: colors.tertiary, 
        backgroundColor: colors.background,
        transition: 'all 0.2s ease'
      }}
    >
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
        Create AI-Assisted Polygon
      </h3>

      <p className="text-sm mb-4" style={{ color: colors.mutedText }}>
        Use our AI-assisted tool to create and analyze geographic polygons.
      </p>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded-md transition-all duration-200 hover:shadow-md"
          style={{
            backgroundColor: isDrawing ? colors.primary : colors.tertiary,
            color: isDrawing ? colors.background : colors.primary,
            border: `1px solid ${isDrawing ? colors.primary : colors.tertiary}`,
            fontWeight: '500'
          }}
          onClick={isDrawing ? handleCancelDrawing : handleStartDrawing}
          onMouseEnter={(e) => {
            if (!isDrawing) {
              e.currentTarget.style.backgroundColor = colors.secondary;
              e.currentTarget.style.color = colors.background;
            }
          }}
          onMouseLeave={(e) => {
            if (!isDrawing) {
              e.currentTarget.style.backgroundColor = colors.tertiary;
              e.currentTarget.style.color = colors.primary;
            }
          }}
        >
          {isDrawing ? 'Cancel Drawing' : 'Start Drawing Polygon'}
        </button>

        {isDrawing && (
          <div className="flex items-center text-sm" style={{ color: colors.mutedText }}>
            <span 
              className="animate-pulse mr-1" 
              style={{ color: colors.secondary }}
            >
              ●
            </span>
            <span>Click on the map to add points. Complete the polygon by connecting to the first point.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPolygonCreator;
