import React from 'react';
import theme from '../../theme/theme';

interface PolygonControlsProps {
  polygonCount: number;
  isPredefinedCount?: number;
}

const PolygonControls: React.FC<PolygonControlsProps> = ({ 
  polygonCount,
  isPredefinedCount = 0
}) => {
  const { colors } = theme;
  
  return (
    <div 
      className="p-4 rounded-lg border flex justify-between items-center my-4"
      style={{ 
        backgroundColor: colors.background,
        borderColor: colors.tertiary
      }}
    >
      <div className="flex flex-col gap-1">
        {isPredefinedCount > 0 && (
          <div style={{ color: colors.text }}>
            Predefined polygons: {isPredefinedCount}
          </div>
        )}
        <div style={{ color: colors.text }}>
          {polygonCount === 0 ? 
            'No user-drawn polygons yet' : 
            `User-drawn polygons: ${polygonCount}`
          }
        </div>
      </div>
      
      <div 
        className="text-sm italic"
        style={{ color: colors.secondary }}
      >
        Press Ctrl+Z to undo last polygon
      </div>
    </div>
  );
};

export default PolygonControls;
