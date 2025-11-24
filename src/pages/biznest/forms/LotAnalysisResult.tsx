import React, { useEffect } from "react";
import DefaultLayout from "@/layout/default";
import { useTheme } from "@/theme/theme";
import { BusinessLotAnalysisResults as BusinessLotAnalysisResults } from "@/pages/biznest/components/FinalLotResult";
// Zustand stores and logMemoryState import
import { logMemoryState } from "../data/memory-option-1";

const LotAnalysisResult: React.FC = () => {
  const theme = useTheme();

  // Log Zustand memory state on mount
  useEffect(() => {
    logMemoryState();
  }, []);

  return (
    <DefaultLayout>
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: theme.colors.primary }}
        >
          Commercial Lot Analysis
        </h1>
        <p className="mb-10 text-lg" style={{ color: theme.colors.mutedText }}>
          Based on your lot's details, here are AI-powered recommendations
          including business suggestions, POI, and zoning information.
        </p>

        <BusinessLotAnalysisResults />
      </div>
    </DefaultLayout>
  );
};

export default LotAnalysisResult;
