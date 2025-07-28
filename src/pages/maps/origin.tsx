import React from "react";
import { useTheme } from "../../theme/theme";


interface OriginIndicatorProps {
  id: string;
  title: string;
  icon: React.ElementType;
  cardClass?: string;
}

/**
 * Displays a color-coded icon indicator for origins density, showing only the category icon and title.
 */

// Original color palette for categories
const CATEGORY_COLORS: Record<string, string> = {
  zoning: "#6366f1",
  transportation: "#22c55e",
  environment: "#f59e42",
  demographics: "#ef4444",
  infrastructure: "#0ea5e9",
  economic: "#a21caf",
  services: "#16a34a",
  none: "#9ca3af"
};

const OriginIndicator: React.FC<OriginIndicatorProps> = ({ id, title, icon: Icon, cardClass }) => {
  const theme = useTheme();
  const color = CATEGORY_COLORS[id] || "#6366f1";
  const cardStyle = {
    ...theme.components.card,
    marginBottom: "1rem",
    width: "100%",
  };
  return (
    <div className={`shadow ${cardClass || ''}`} style={cardStyle}>
      <div className="d-flex flex-column align-items-center gap-2 mb-2">
        <Icon size={28} color={color} />
        <span className="font-semibold text-md text-center" style={{ color }}>{title} <span className="text-xs" style={{ color: theme.colors.mutedText }}>Origin</span></span>
      </div>
    </div>
  );
};

export default OriginIndicator;
