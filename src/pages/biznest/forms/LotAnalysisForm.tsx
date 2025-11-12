import React from "react";
import { useLotAnalysisStore as useGlobalLotAnalysisStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";

type LotAnalysisInputs = {
  location: string;
  lotSize: string;
  capital: string;
  operatingHours: string;
};

const LotAnalysisForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Use global Zustand store from memory-option-1.ts

  const { location, lotSize, capital, operatingHours, setInputs } =
    useGlobalLotAnalysisStore();

  const handleChange =
    (field: keyof LotAnalysisInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs({ [field]: e.target.value });
    };

  const handleSubmit = () => {
    console.log("Lot Analysis Inputs:", {
      location,
      lotSize,
      capital,
      operatingHours,
    });
    // Save to global Zustand store
    setInputs({
      location,
      lotSize,
      capital,
      operatingHours,
    });
    navigate("/biznest/lot-analysis-result");
  };

  return (
    <DefaultLayout>
      <div
        className="container mx-auto p-4 pt-10"
        style={{ color: theme.colors.text }}
      >
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: theme.colors.primary }}
        >
          Analyze Your Lot
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Provide details about your lot, and we'll help you find the best
          business to build.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="location">Address</Label>
            <Input
              id="location"
              placeholder="e.g., 123 Main St, Anytown"
              value={location}
              onChange={handleChange("location")}
            />
          </div>
          <div>
            <Label htmlFor="lotSize">Lot Size (e.g., in square meters)</Label>
            <Input
              id="lotSize"
              placeholder="e.g., 500 sqm"
              value={lotSize}
              onChange={handleChange("lotSize")}
            />
          </div>
          <div>
            <Label htmlFor="capital">Capital</Label>
            <Input
              id="capital"
              placeholder="e.g., 100000"
              value={capital}
              onChange={handleChange("capital")}
            />
          </div>
          <div>
            <Label htmlFor="operatingHours">Operating Hours</Label>
            <Input
              id="operatingHours"
              placeholder="e.g., 9am - 5pm"
              value={operatingHours}
              onChange={handleChange("operatingHours")}
            />
          </div>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? theme.colors.background : theme.colors.text,
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LotAnalysisForm;
