import React from "react";
import { useBusinessIdeaStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";

type BusinessIdeaInputs = {
  businessType: string;
  capital: string;
  operatingHours: string;
};

const BusinessIdeaForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { businessType, capital, operatingHours, setInputs } =
    useBusinessIdeaStore();

  const handleChange =
    (field: keyof BusinessIdeaInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs({ [field]: e.target.value });
    };

  const handleSubmit = () => {
    console.log("Business Idea Inputs:", {
      businessType,
      capital,
      operatingHours,
    });
    // Save to global Zustand store
    setInputs({
      businessType,
      capital,
      operatingHours,
    });
    navigate("/biznest/business-idea-result");
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
          Find the Perfect Location
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Tell us about your business, and we'll help you find the ideal
          location.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              placeholder="e.g., Coffee Shop, Retail Store, Restaurant"
              value={businessType}
              onChange={handleChange("businessType")}
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
            Find Locations
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaForm;
