import React from "react";
import { useSupplierMatchStore } from "@/pages/biznest/data/memory-option-1";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";

type SupplierMatchInputs = {
  businessType: string;
  address: string;
};

const SupplierMatchForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { businessType, address, setInputs } = useSupplierMatchStore();

  const handleChange =
    (field: keyof SupplierMatchInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs({ [field]: e.target.value });
    };

  const handleSubmit = () => {
    console.log("Supplier Match Inputs:", {
      businessType,
      address,
    });
    // Save to global Zustand store
    setInputs({
      businessType,
      address,
    });
    navigate("/biznest/supplier-match-result");
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
          Find Suppliers for Your Business
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Tell us about your business type and location, and we'll connect you
          with verified suppliers.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Input
              id="businessType"
              placeholder="e.g., Restaurant, Retail Store, Manufacturing"
              value={businessType}
              onChange={handleChange("businessType")}
            />
          </div>
          <div>
            <Label htmlFor="address">Your Business Address</Label>
            <Input
              id="address"
              placeholder="e.g., IT Park, Cebu City"
              value={address}
              onChange={handleChange("address")}
            />
          </div>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.isDark ? theme.colors.background : theme.colors.text,
            }}
          >
            Find Suppliers
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SupplierMatchForm;
