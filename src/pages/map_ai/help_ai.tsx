import React from 'react';
import { useTheme } from '../../theme/theme';
import { HelpCircle, MapPin, Layers, Search, Zap } from 'lucide-react';

interface HelpAIProps {
  className?: string;
}

const HelpAI: React.FC<HelpAIProps> = ({ className = '' }) => {
  const theme = useTheme();
  const { colors } = theme;

  const helpSections = [
    {
      icon: <MapPin size={20} />,
      title: 'Polygon Creation',
      description: 'Click "Start Drawing Polygon" to create custom geographic areas for analysis.'
    },
    {
      icon: <Layers size={20} />,
      title: 'Layer Management',
      description: 'Toggle between heritage sites and flood zones to compare overlapping areas.'
    },
    {
      icon: <Search size={20} />,
      title: 'Location Search',
      description: 'Use the search box to find specific locations and center the map view.'
    },
    {
      icon: <Zap size={20} />,
      title: 'AI Analysis',
      description: 'Click "Analyze" to get AI-powered insights about selected geographic areas.'
    }
  ];

  return (
    <div 
      className={`p-6 rounded-lg ${className}`}
      style={{ 
        backgroundColor: colors.background,
        border: `1px solid ${colors.tertiary}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle style={{ color: colors.primary }} size={24} />
        <h3 
          className="text-xl font-semibold"
          style={{ color: colors.primary }}
        >
          AI Map Analysis Help
        </h3>
      </div>

      <p 
        className="text-sm mb-6"
        style={{ color: colors.mutedText }}
      >
        Learn how to use the AI-enhanced mapping tools to analyze geographic data and make informed decisions.
      </p>

      <div className="space-y-4">
        {helpSections.map((section, index) => (
          <div 
            key={index}
            className="flex gap-3 p-3 rounded-md transition-all duration-200"
            style={{ 
              backgroundColor: colors.background,
              border: `1px solid ${colors.tertiary}20`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.tertiary}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.background;
            }}
          >
            <div 
              className="flex-shrink-0 p-2 rounded-full"
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <div style={{ color: colors.primary }}>
                {section.icon}
              </div>
            </div>
            <div>
              <h4 
                className="font-medium text-sm mb-1"
                style={{ color: colors.text }}
              >
                {section.title}
              </h4>
              <p 
                className="text-xs"
                style={{ color: colors.mutedText }}
              >
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div 
        className="mt-6 p-3 rounded-md"
        style={{ 
          backgroundColor: `${colors.secondary}10`,
          border: `1px solid ${colors.secondary}30`
        }}
      >
        <p 
          className="text-xs font-medium"
          style={{ color: colors.text }}
        >
          💡 Tip: Use the drawing tool to create custom polygons and get AI insights about business potential and risk assessment.
        </p>
      </div>
    </div>
  );
};

export default HelpAI;
