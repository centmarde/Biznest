import React from "react";
import { useTheme } from "@/theme/theme";
import DefaultLayout from "@/layout/default";
import BusinessStepper from "@/components/business-stepper2";


const BusinessIdeaForm: React.FC = () => {
  const theme = useTheme();

  return (
    <DefaultLayout>
      <div style={{ backgroundColor: theme.colors.background, minHeight: "100vh" }}>
        <BusinessStepper />
      </div>
    </DefaultLayout>
  );
};

export default BusinessIdeaForm;
