import React from 'react';
import { useTheme } from '../../theme/theme';

interface AIAnalysisPanelProps {
  biznestCount: number;
  floodCount: number;
  overlappingAreas?: number;
  riskLevel?: 'low' | 'medium' | 'high';
}

const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  biznestCount,
  floodCount,
  overlappingAreas = 0,
  riskLevel = 'medium'
}) => {
  const theme = useTheme();
  const { colors } = theme;
  
  const getRiskColor = () => {
    switch(riskLevel) {
      case 'low': return colors.secondary;
      case 'medium': return colors.tertiary;
      case 'high': return colors.primary;
      default: return colors.tertiary;
    }
  };

  return (
    <div 
      className="p-4 rounded-lg mb-4"
      style={{ 
        backgroundColor: colors.background,
        borderColor: colors.tertiary,
        border: '1px solid'
      }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
        AI Map Analysis
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)' }}>
          <h3 className="font-bold mb-1" style={{ color: colors.secondary }}>Biznest Sites</h3>
          <p className="text-2xl font-bold" style={{ color: colors.text }}>{biznestCount}</p>
          <p className="text-sm" style={{ color: colors.text }}>Cultural areas identified</p>
        </div>
        
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 82, 82, 0.15)' }}>
          <h3 className="font-bold mb-1" style={{ color: colors.primary }}>Flood Zones</h3>
          <p className="text-2xl font-bold" style={{ color: colors.text }}>{floodCount}</p>
          <p className="text-sm" style={{ color: colors.text }}>Potential flood risk areas</p>
        </div>
        
        <div className="p-3 rounded-lg" style={{ backgroundColor: `rgba(${getRiskColor()}, 0.15)` }}>
          <h3 className="font-bold mb-1" style={{ color: getRiskColor() }}>Risk Assessment</h3>
          <p className="text-2xl font-bold capitalize" style={{ color: colors.text }}>{riskLevel}</p>
          <p className="text-sm" style={{ color: colors.text }}>
            {overlappingAreas} potential conflict {overlappingAreas === 1 ? 'area' : 'areas'}
          </p>
        </div>
      </div>
      
      <p style={{ color: colors.text, lineHeight: '1.5' }}>
        Our AI has analyzed the geographical data to identify biznest sites and potential flood zones in this region. 
        {biznestCount > 0 && floodCount > 0 ? (
          ` Based on the proximity analysis, there ${overlappingAreas === 1 ? 'is' : 'are'} ${overlappingAreas} 
          potential ${overlappingAreas === 1 ? 'area' : 'areas'} where biznest sites may be affected by flooding. 
          The overall risk level for this region is ${riskLevel}.`
        ) : (
          " Additional data is needed for a comprehensive risk assessment."
        )}
      </p>
    </div>
  );
};

export default AIAnalysisPanel;
