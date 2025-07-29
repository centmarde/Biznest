import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { Textarea } from "@/components/ui/textarea";

const ExpansionForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/biznest/form?from=expansion");
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: theme.colors.primary }}>
          Expand or Relocate Your Business
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Let's find the best new location for your existing business.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="currentBusiness">Current Business Type</Label>
            <Input id="currentBusiness" placeholder="e.g., Restaurant, Office" />
          </div>
          <div>
            <Label htmlFor="currentLocation">Current Location</Label>
            <Input id="currentLocation" placeholder="e.g., 456 Oak Ave, Old Town" />
          </div>
          <div>
            <Label htmlFor="expansionGoals">Expansion/Relocation Goals</Label>
            <Textarea id="expansionGoals" placeholder="e.g., Larger space, new market, better visibility" />
          </div>
          <div>
            <Label htmlFor="targetArea">Target Area for Expansion/Relocation</Label>
            <Input id="targetArea" placeholder="e.g., Northside, City Center" />
          </div>
          <Button onClick={handleSubmit} style={{ backgroundColor: theme.colors.primary, color: theme.isDark ? theme.colors.text : theme.colors.background }}>
            Next
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExpansionForm;
