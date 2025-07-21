import React from 'react';
import { useTheme } from '../../../theme/theme';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const { colors } = theme;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dialog from closing it
        style={{ 
          borderColor: colors.tertiary, 
          borderWidth: '1px',
          animation: 'fadeIn 0.2s ease-out' 
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={{ color: colors.primary }}
        >
          Map Help
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: colors.secondary }}>
              Drawing Polygons
            </h3>
            <p className="text-gray-700">
              1. Use the drawing tools in the map to create a polygon.
              2. Click on the map to create points for your polygon.
              3. Close the polygon by clicking on the first point.
              4. Press Ctrl+Z to undo the last drawn polygon if needed.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: colors.secondary }}>
              Adding Biznest Sites
            </h3>
            <p className="text-gray-700">
              1. Draw a polygon on the map to mark the biznest site area.
              2. Click the "Add Biznest" button to add information about this site.
              3. If you haven't drawn a polygon yet, you'll need to create one first.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-1" style={{ color: colors.secondary }}>
              Map Layers
            </h3>
            <p className="text-gray-700">
              • Use the tab buttons to toggle between different map views.
              • "Standard Map" shows all layers and allows drawing.
              • "Biznest Sites" shows only biznest site polygons.
              • "Flood Zones" shows only flood zone polygons.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: colors.primary,
              color: colors.background
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HelpDialog;
