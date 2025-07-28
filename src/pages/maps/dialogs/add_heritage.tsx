import React from 'react';
import { useTheme } from '../../../theme/theme';

interface AddHeritageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  polygonId: number;
  polygonPaths?: Array<{ lat: number; lng: number }>;
}

const AddHeritageDialog: React.FC<AddHeritageDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  polygonId,
  polygonPaths
}) => {
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
        className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the dialog from closing it
        style={{ ...components.card, animation: 'fadeIn 0.2s ease-out' }}
      >
        <h2 
          className="text-2xl font-bold mb-4"
          style={components.text.heading}
        >
          Add Heritage Site - Polygon {polygonId}
        </h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2" style={components.text.small}>
            Polygon Coordinates
          </h3>
          <div 
            className="bg-gray-100 p-3 rounded-md max-h-60 overflow-y-auto"
            style={{ fontSize: '0.85rem' }}
          >
            {polygonPaths ? (
              <pre>{JSON.stringify(polygonPaths, null, 2)}</pre>
            ) : (
              <p>No polygon data available.</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="heritage-name" 
              className="block font-medium mb-1"
              style={components.text.body}
            >
              Heritage Site Name
            </label>
            <input
              type="text"
              id="heritage-name"
              className="w-full border rounded-md px-3 py-2"
              style={components.input.base}
              placeholder="Enter the name of this heritage site"
              onFocus={e => Object.assign(e.target.style, components.input.hover)}
              onBlur={e => Object.assign(e.target.style, components.input.base)}
            />
          </div>

          <div>
            <label 
              htmlFor="heritage-description" 
              className="block font-medium mb-1"
              style={components.text.body}
            >
              Description
            </label>
            <textarea
              id="heritage-description"
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              style={components.input.base}
              placeholder="Enter a description for this heritage site"
              onFocus={e => Object.assign(e.target.style, components.input.hover)}
              onBlur={e => Object.assign(e.target.style, components.input.base)}
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded-md"
            style={components.button.secondary.base}
            onMouseOver={e => Object.assign((e.target as HTMLButtonElement).style, components.button.secondary.hover)}
            onMouseOut={e => Object.assign((e.target as HTMLButtonElement).style, components.button.secondary.base)}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md"
            style={components.button.primary.base}
            onMouseOver={e => Object.assign((e.target as HTMLButtonElement).style, components.button.primary.hover)}
            onMouseOut={e => Object.assign((e.target as HTMLButtonElement).style, components.button.primary.base)}
            onClick={onConfirm}
          >
            Confirm
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

export default AddHeritageDialog;
