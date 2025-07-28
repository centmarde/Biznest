import React from 'react';
import { useTheme } from '../../../theme/theme';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const { components } = theme;

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
        style={{ ...components.card, animation: 'fadeIn 0.2s ease-out' }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={components.text.heading}
        >
          Map Help
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1" style={components.text.small}>
              Drawing Polygons
            </h3>
            <p style={components.text.body}>
              1. Use the drawing tools in the map to create a polygon.<br />
              2. Click on the map to create points for your polygon.<br />
              3. Close the polygon by clicking on the first point.<br />
              4. Press Ctrl+Z to undo the last drawn polygon if needed.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-1" style={components.text.small}>
              Adding Biznest Sites
            </h3>
            <p style={components.text.body}>
              1. Draw a polygon on the map to mark the biznest site area.<br />
              2. Click the "Add Biznest" button to add information about this site.<br />
              3. If you haven't drawn a polygon yet, you'll need to create one first.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-1" style={components.text.small}>
              Map Layers
            </h3>
            <p style={components.text.body}>
              • Use the tab buttons to toggle between different map views.<br />
              • "Standard Map" shows all layers and allows drawing.<br />
              • "Biznest Sites" shows only biznest site polygons.<br />
              • "Flood Zones" shows only flood zone polygons.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 rounded-md"
            style={components.button.primary.base}
            onMouseOver={e => Object.assign((e.target as HTMLButtonElement).style, components.button.primary.hover)}
            onMouseOut={e => Object.assign((e.target as HTMLButtonElement).style, components.button.primary.base)}
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
