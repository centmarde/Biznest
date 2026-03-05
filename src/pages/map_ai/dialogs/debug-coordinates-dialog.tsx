import React from "react";
import { useTheme } from "../../../theme/theme";
import { X, MapPin, Copy } from "lucide-react";

interface Coordinate {
  lat: number;
  lng: number;
}

interface DebugCoordinatesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates: Coordinate[];
  polygonName?: string;
}

const DebugCoordinatesDialog: React.FC<DebugCoordinatesDialogProps> = ({
  isOpen,
  onClose,
  coordinates,
  polygonName = "User Polygon",
}) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  const handleCopyJSON = () => {
    const polygonData = {
      name: polygonName,
      paths: coordinates,
      options: {
        fillColor: "#2ecc71",
        strokeColor: "#27ae60",
        fillOpacity: 0.3,
        strokeWeight: 2
      }
    };
    const jsonText = JSON.stringify(polygonData, null, 2);
    navigator.clipboard.writeText(jsonText);
    alert("Polygon JSON copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-opacity-10"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      />
      
      {/* Dialog */}
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0 border-b border-gray-200">
          <h2
            className="text-lg font-semibold flex items-center gap-2"
            style={{ color: colors.primary }}
          >
            <MapPin size={20} />
            Polygon Coordinates
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X size={20} style={{ color: colors.primary }} />
          </button>
        </div>

        {/* Polygon Info */}
        <div className="px-6 py-4 flex-shrink-0 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-1">
            Polygon: <strong>{polygonName}</strong>
          </p>
          <p className="text-sm text-gray-600">
            Total Points: <strong>{coordinates.length}</strong>
          </p>
        </div>

        {/* JSON Content - Scrollable */}
        <div className="flex-1 overflow-hidden p-6 min-h-0">
          <div className="bg-gray-900 rounded-lg overflow-y-auto max-h-96" style={{ height: '400px' }}>
            <pre className="text-sm text-green-400 whitespace-pre-wrap p-6 pb-20 overflow-x-auto">
{JSON.stringify({
  name: polygonName,
  paths: coordinates,
  options: {
    fillColor: "#2ecc71",
    strokeColor: "#27ae60",
    fillOpacity: 0.3,
    strokeWeight: 2
  }
}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 pt-4 flex-shrink-0 border-t border-gray-200">
          <button
            onClick={handleCopyJSON}
            className="px-4 py-2 border rounded-lg transition-colors hover:bg-gray-50 flex items-center gap-2"
            style={{
              borderColor: colors.tertiary,
              color: colors.primary,
            }}
          >
            <Copy size={16} />
            Copy JSON
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg transition-colors text-white font-medium"
            style={{
              backgroundColor: colors.primary,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugCoordinatesDialog;
