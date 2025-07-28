import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../theme/theme';
import { X, PlusCircle, AlertTriangle, Sun, Moon } from 'lucide-react';
import axios from 'axios';

interface Analysis {
  id: number;
  title: string;
  imageUrl: string;
  insights: string;
  riskLevel: string;
  timestamp: string;
  origin: 'residential' | 'business' | 'traffic'; // Changed flood to traffic
  businessPotential?: string; // Added business potential prediction
}

interface AnalysisResponse {
  analyses: Analysis[];
}

interface AnalyzeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToAnalytics?: () => void;
  imageUrl?: string;
}

const AnalyzeDialog: React.FC<AnalyzeDialogProps> = ({
  isOpen,
  onClose,
  onAddToAnalytics,
  imageUrl
}) => {
  const theme = useTheme();
  const { colors, components } = theme;
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [blueBackground, setBlueBackground] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetchRandomAnalysis();
    }
  }, [isOpen]);

  const fetchRandomAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<AnalysisResponse>('/data/aiAnalyze.json');
      const { analyses } = response.data;
      
      if (analyses && analyses.length > 0) {
        // Get a random analysis
        const randomIndex = Math.floor(Math.random() * analyses.length);
        setAnalysis(analyses[randomIndex]);
      } else {
        setError('No analysis data available');
      }
    } catch (err) {
      setError('Failed to fetch analysis data');
      console.error('Error fetching analysis data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fullscreen Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Fullscreen Dialog Content */}
      <div
        className="fixed inset-0 z-10 flex flex-col"
        style={{ backgroundColor: blueBackground ? colors.primary : colors.background }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: colors.tertiary }}
        >
          <h2
            className="text-2xl font-bold"
            style={{
              ...components.text.heading,
              color: blueBackground ? 'white' : components.text.heading.color
            }}
          >
            {loading ? 'Loading Analysis...' : analysis?.title || 'AI Map Analysis'}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBlueBackground(!blueBackground)}
              className="p-1 rounded-full hover:bg-opacity-20"
              title={blueBackground ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {blueBackground ? (
                <Sun size={20} color="white" />
              ) : (
                <Moon size={20} color={colors.text} />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-opacity-20"
            >
              <X size={20} color={blueBackground ? 'white' : colors.text} />
            </button>
          </div>
        </div>

        {/* Body: 2-column grid, fullscreen */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 h-full overflow-auto">
          {/* Left: Image and Legend */}
          <div className="flex flex-col items-center justify-center h-full  bg-opacity-80 p-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: blueBackground ? colors.background : colors.primary }}></div>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertTriangle size={32} color={blueBackground ? 'white' : colors.primary} className="mb-2" />
                <p style={{ color: blueBackground ? 'white' : colors.primary }}>{error}</p>
                <button
                  className="mt-4"
                  style={{
                    ...components.button.secondary.base,
                    ...(components.button.secondary.hover || {})
                  }}
                  onClick={fetchRandomAnalysis}
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="rounded-lg overflow-hidden border w-full max-w-lg mb-6" style={{ borderColor: colors.tertiary }}>
                  <img
                    src={analysis?.imageUrl || imageUrl || 'data/images/map.png'}
                    alt="AI Analysis Visualization"
                    className="w-full h-auto"
                  />
                </div>
                {/* Origin Legend */}
                <div className="flex justify-center gap-8 p-2  bg-opacity-90 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs">Residential</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs">Business</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs">Traffic-Prone</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Analysis Details */}
          <div className="flex flex-col justify-center h-full p-8" style={{ backgroundColor: blueBackground ? '#2a3b5a' : colors.background }}>
            {!loading && !error && (
              <div className="rounded-lg p-8 shadow-lg" style={{
                backgroundColor: blueBackground ? colors.primary : colors.background,
                borderLeft: `6px solid ${
                  analysis?.origin === 'residential' ? 'green' :
                  analysis?.origin === 'traffic' ? 'yellow' : 'blue'
                }`
              }}>
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className="font-semibold text-lg"
                    style={{
                      ...components.text.heading,
                      color: blueBackground ? 'white' : components.text.heading.color
                    }}
                  >
                    <span className="mr-2">{
                      analysis?.origin === 'residential' ? '🏠' :
                      analysis?.origin === 'traffic' ? '🚦' : '🏢'
                    }</span>
                    Analysis Insights
                  </h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                    backgroundColor:
                      analysis?.riskLevel === 'Critical' ? colors.primary :
                      analysis?.riskLevel === 'High' ? colors.secondary :
                      analysis?.riskLevel === 'Medium-High' ? colors.tertiary :
                      analysis?.riskLevel === 'Medium' ? colors.background : colors.background,
                    color:
                      ['Critical', 'High'].includes(analysis?.riskLevel || '') ?
                      colors.background : blueBackground ? colors.background : colors.text
                  }}>
                    {analysis?.riskLevel || 'Unknown Risk'}
                  </span>
                </div>
                <p className="mb-4" style={{ color: blueBackground ? 'white' : colors.text }}>
                  {analysis?.insights || 'No analysis data available.'}
                </p>

                {analysis?.businessPotential && (
                  <div className="mt-4 border-t pt-3" style={{ borderColor: blueBackground ? colors.tertiary : colors.tertiary }}>
                    <h4 className="font-medium mb-1" style={{ color: blueBackground ? colors.background : colors.primary }}>
                      Business Potential Assessment
                    </h4>
                    <p style={{ color: blueBackground ? colors.background : colors.text }}>{analysis.businessPotential}</p>
                  </div>
                )}

                {analysis?.timestamp && (
                  <p className="text-xs mt-3" style={{ color: blueBackground ? colors.mutedText : colors.mutedText }}>
                    Analysis generated: {new Date(analysis.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex justify-end gap-3 p-6 border-t"
          style={{ borderColor: blueBackground ? 'rgba(255,255,255,0.2)' : colors.tertiary }}
        >
          <button
            style={{
              ...components.button.text.base,
              ...(components.button.text.hover || {}),
              color: blueBackground ? 'white' : components.button.text.base.color,
              border: blueBackground ? '1px solid rgba(255,255,255,0.2)' : `1px solid ${colors.tertiary}`
            }}
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="flex items-center gap-2"
            style={{
              ...components.button.secondary.base,
              ...(components.button.secondary.hover || {})
            }}
            onClick={() => {
              if (onAddToAnalytics) {
                onAddToAnalytics();
              }
            }}
          >
            <PlusCircle size={18} />
            Add to Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeDialog;
