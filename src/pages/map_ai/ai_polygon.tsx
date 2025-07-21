import React, { useState } from 'react';
import { useTheme } from '../../theme/theme';

interface AIPolygonCreatorProps {
  onPolygonComplete?: (polygon: any) => void;
  onCancel?: () => void;
  onStartDrawing?: () => void;
  isDrawing: boolean;
}

const AIPolygonCreator: React.FC<AIPolygonCreatorProps> = ({
  onPolygonComplete,
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
    <div className="mb-4 p-4 rounded-lg border" style={{ borderColor: colors.tertiary, backgroundColor: 'white' }}>
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>
        Create AI-Assisted Polygon
      </h3>

      <p className="text-sm mb-4" style={{ color: colors.text }}>
        Use our AI-assisted tool to create and analyze geographic polygons.
      </p>

      <div className="flex gap-3">
        <button
          className="px-4 py-2 rounded-md transition-all duration-200"
          style={{
            backgroundColor: isDrawing ? colors.primary : colors.tertiary,
            color: isDrawing ? 'white' : colors.primary,
          }}
          onClick={isDrawing ? handleCancelDrawing : handleStartDrawing}
        >
          {isDrawing ? 'Cancel Drawing' : 'Start Drawing Polygon'}
        </button>

        {isDrawing && (
          <div className="flex items-center text-sm" style={{ color: colors.text }}>
            <span className="animate-pulse mr-1">●</span>
            <span>Click on the map to add points. Complete the polygon by connecting to the first point.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPolygonCreator;
