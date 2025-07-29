import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import { Textarea } from "@/components/ui/textarea";

const LotAnalysisForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/biznest/form?from=lot-analysis");
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 pt-10" style={{ color: theme.colors.text }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: theme.colors.primary }}>
          Analyze Your Lot
        </h1>
        <p className="mb-8" style={{ color: theme.colors.mutedText }}>
          Provide details about your lot, and we'll help you find the best business to build.
        </p>
        <div className="space-y-6">
          <div>
            <Label htmlFor="location">Location/Address</Label>
            <Input id="location" placeholder="e.g., 123 Main St, Anytown" />
          </div>
          <div>
            <Label htmlFor="lotSize">Lot Size (e.g., in square meters)</Label>
            <Input id="lotSize" placeholder="e.g., 500 sqm" />
          </div>
          <div>
            <Label htmlFor="zoningInfo">Zoning Information (if known)</Label>
            <Input id="zoningInfo" placeholder="e.g., Commercial, Residential" />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any other relevant details about your lot" />
          </div>
          <Button onClick={handleSubmit} style={{ backgroundColor: theme.colors.primary, color: theme.isDark ? theme.colors.text : theme.colors.background }}>
            Next
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LotAnalysisForm;
