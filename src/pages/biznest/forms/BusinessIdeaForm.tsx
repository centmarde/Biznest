import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { Textarea } from "@/components/ui/textarea";

const BusinessIdeaForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/biznest/business-idea-result");
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: theme.colors.primary }}>
          Find a Location for Your Business
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Tell us about your business idea, and we'll help you find the perfect spot.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessType">Business Idea/Type</Label>
            <Input id="businessType" placeholder="e.g., Coffee Shop, Retail Store" />
          </div>
          <div>
            <Label htmlFor="preferredLocation">Preferred Location/Area</Label>
            <Input id="preferredLocation" placeholder="e.g., Downtown, Suburbs" />
          </div>
          <div>
            <Label htmlFor="budget">Budget for land/rent</Label>
            <Input id="budget" placeholder="e.g., $50,000" />
          </div>
          <div>
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea id="requirements" placeholder="e.g., High foot traffic, near public transport" />
          </div>
          <Button onClick={handleSubmit} style={{ backgroundColor: theme.colors.primary, color: theme.isDark ? theme.colors.text : theme.colors.background }}>
            Find Location
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaForm;
