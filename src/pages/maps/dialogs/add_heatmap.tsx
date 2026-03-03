import React, { useState } from "react";
import { useTheme } from "../../../theme/theme";
import { X, MapPin, Plus, Eye } from "lucide-react";

interface AddHeatmapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'add' | 'view') => void;
  zoneName: string;
}

const AddHeatmapDialog: React.FC<AddHeatmapDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  zoneName,
}) => {
  const { colors } = useTheme();
  const [selectedAction, setSelectedAction] = useState<'add' | 'view' | null>(null);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedAction) {
      onConfirm(selectedAction);
      setSelectedAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-opacity-10"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      />
      
      {/* Dialog */}
      <div
        className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4"
        style={{ backgroundColor: colors.background }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-semibold flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <MapPin size={20} />
            Add Zone Layer
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X size={20} style={{ color: colors.primary }} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            What would you like to do with the <strong>{zoneName}</strong> zone?
          </p>
          
          {/* Action Options */}
          <div className="space-y-3 mb-4">
            <button
              onClick={() => setSelectedAction('add')}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedAction === 'add' ? 'border-2 shadow-md' : 'border hover:shadow-sm'
              }`}
              style={{
                borderColor: selectedAction === 'add' ? colors.primary : colors.tertiary,
                backgroundColor: selectedAction === 'add' ? `${colors.primary}10` : colors.background,
              }}
            >
              <div className="flex items-center gap-3">
                <Plus size={20} style={{ color: colors.primary }} />
                <div>
                  <p className="font-medium" style={{ color: colors.primary }}>Add Zone</p>
                  <p className="text-sm text-gray-500">
                    Add {zoneName.toLowerCase()} areas to the map permanently
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedAction('view')}
              className={`w-full p-4 border rounded-lg text-left transition-all ${
                selectedAction === 'view' ? 'border-2 shadow-md' : 'border hover:shadow-sm'
              }`}
              style={{
                borderColor: selectedAction === 'view' ? colors.primary : colors.tertiary,
                backgroundColor: selectedAction === 'view' ? `${colors.primary}10` : colors.background,
              }}
            >
              <div className="flex items-center gap-3">
                <Eye size={20} style={{ color: colors.primary }} />
                <div>
                  <p className="font-medium" style={{ color: colors.primary }}>View as Filter</p>
                  <p className="text-sm text-gray-500">
                    Display {zoneName.toLowerCase()} areas as a temporary overlay
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50"
            style={{
              borderColor: colors.tertiary,
              color: colors.primary,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedAction}
            className={`px-4 py-2 rounded-lg transition-colors text-white font-medium ${
              !selectedAction ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              backgroundColor: selectedAction ? colors.primary : '#ccc',
            }}
          >
            {selectedAction === 'add' ? 'Add Zone' : selectedAction === 'view' ? 'Apply Filter' : 'Select Option'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHeatmapDialog;
