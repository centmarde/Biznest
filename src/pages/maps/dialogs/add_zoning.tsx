import React from 'react';
import { useTheme } from '../../../theme/theme';
import { useNavigate } from 'react-router-dom';


interface AddZoningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  polygonId: number;
  polygonPaths?: Array<{ lat: number; lng: number }>;
}


const AddZoningDialog: React.FC<AddZoningDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm
}) => {
  const theme = useTheme();
  const {  components } = theme;
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    navigate('/maps/ai');
  };

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
          Add new Zoning
        </h2>
        
    
        
        <div className="space-y-4">
          <div>
            <label 
              htmlFor="zoning-name" 
              className="block font-medium mb-1"
              style={components.text.body}
            >
             Zoning Site Name
            </label>
            <input
              type="text"
              id="zoning-name"
              className="w-full border rounded-md px-3 py-2"
              style={components.input.base}
              placeholder="Enter the name of this zoning site"
              onFocus={e => Object.assign(e.target.style, components.input.hover)}
              onBlur={e => Object.assign(e.target.style, components.input.base)}
            />
          </div>

          <div>
            <label 
              htmlFor="zoning-description" 
              className="block font-medium mb-1"
              style={components.text.body}
            >
              Description
            </label>
            <textarea
              id="zoning-description"
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              style={components.input.base}
              placeholder="Enter a description for this zoning site"
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
            onClick={handleConfirm}
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

export default AddZoningDialog;
