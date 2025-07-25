import React from 'react';
import { useTheme } from '../../../theme/theme';
import { useNavigate } from 'react-router-dom';

interface AddBiznestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  polygonId: number;
  polygonPaths?: Array<{ lat: number; lng: number }>;
}


const AddBiznestDialog: React.FC<AddBiznestDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  polygonPaths
}) => {
  const theme = useTheme();
  const { colors } = theme;
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
          Add Biznest Site 
        </h2>
        
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2" style={{ color: colors.secondary }}>
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
              htmlFor="biznest-name" 
              className="block font-medium mb-1"
              style={{ color: colors.text }}
            >
              Biznest Site Name
            </label>
            <input
              type="text"
              id="biznest-name"
              className="w-full border rounded-md px-3 py-2"
              style={{ borderColor: colors.tertiary }}
              placeholder="Enter the name of this biznest site"
            />
          </div>

          <div>
            <label 
              htmlFor="biznest-description" 
              className="block font-medium mb-1"
              style={{ color: colors.text }}
            >
              Description
            </label>
            <textarea
              id="biznest-description"
              rows={3}
              className="w-full border rounded-md px-3 py-2"
              style={{ borderColor: colors.tertiary }}
              placeholder="Enter a description for this biznest site"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: 'white',
              color: colors.text,
              border: `1px solid ${colors.tertiary}`
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md"
            style={{
              backgroundColor: colors.primary,
              color: colors.background
            }}
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

export default AddBiznestDialog;
