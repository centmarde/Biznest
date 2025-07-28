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
  commercial_zones: "#6366f1", // indigo
  food_beverage: "#f59e42", // green
  tech_industry: " #22c55e", // orange
  manufacturing: "#ef4444", // red
  real_estate: "#0ea5e9", // blue
  logistics: "#a21caf", // purple
  finance: "#1eee", // dark green
  healthcare: "#9ca3af", // gray
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
