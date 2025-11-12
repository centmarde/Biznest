import React from "react";
import { useSpaceSearchStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";

type SpaceSearchInputs = {
  address: string;
  size: string;
};

const SpaceSearchForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { address, size, setInputs } = useSpaceSearchStore();

  const handleChange =
    (field: keyof SpaceSearchInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs({ [field]: e.target.value });
    };

  const handleSubmit = () => {
    console.log("Space Search Inputs:", {
      address,
      size,
    });
    // Save to global Zustand store
    setInputs({
      address,
      size,
    });
    navigate("/biznest/space-search-result");
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
          Find Space Rental or Lot for Sale
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Tell us your location preferences and space requirements, and we'll
          find the best options for you.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="address" className="mb-2">
              Preferred Address/Area
            </Label>
            <Input
              id="address"
              placeholder="e.g., IT Park, Cebu City or nearby areas"
              value={address}
              onChange={handleChange("address")}
            />
          </div>
          <div>
            <Label htmlFor="size" className="mb-2">
              Required Space Size (in square meters)
            </Label>
            <Input
              id="size"
              placeholder="e.g., 150 sqm"
              value={size}
              onChange={handleChange("size")}
            />
          </div>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? theme.colors.background : theme.colors.text,
            }}
          >
            Search Available Spaces
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SpaceSearchForm;
