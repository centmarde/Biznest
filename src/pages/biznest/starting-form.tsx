import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layout/default";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme";
import { useUserChoiceStore } from "./data/memory-option-1";
import ChatButton from "@/components/AIrelated/ChatButton";

const StartingFrom: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const saveUserChoice = useUserChoiceStore((state) => state.saveUserChoice);
  const getUserChoice = useUserChoiceStore((state) => state.getUserChoice);

  const scenarios = [
    {
      title: "I have a lot",
      description:
        "You own land and want to explore the best business opportunities for your location.",
      cta: "Select this option",
      icon: "🏡",
      path: "/biznest/forms/lot-analysis",
      accentColor: theme.colors.primary,
    },
    {
      title: "I have a business, but no lot",
      description:
        "You have a business idea or existing business but need to find the ideal location to set up or expand.",
      cta: "Select this option",
      icon: "🚀",
      path: "/biznest/forms/business-idea",
      accentColor: theme.colors.secondary,
    },
    {
      title: "I need space rental/lot for sale",
      description:
        "You're looking for available lots or rental spaces that match your business requirements.",
      cta: "Select this option",
      icon: "📍",
      path: "/biznest/forms/space-search",
      accentColor: "#FFC107",
    },
  ];

  return (
    <DefaultLayout>
      <div
        className="min-h-screen flex flex-col items-center p-4 pt-16"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: theme.colors.primary }}
          >
            What describes your current business situation?
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl w-full justify-center">
          {scenarios.map((scenario, index) => (
            <Card
              key={index}
              className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: scenario.accentColor,
                borderTop: `5px solid ${scenario.accentColor}`,
              }}
            >
              <CardHeader className="flex-grow p-8">
                <div
                  className="text-6xl mb-5"
                  style={{ color: scenario.accentColor }}
                >
                  {scenario.icon}
                </div>
                <CardTitle
                  className="text-2xl font-semibold mb-2"
                  style={{ color: theme.colors.primary }}
                >
                  {scenario.title}
                </CardTitle>
                <CardDescription
                  className="mt-2 text-base"
                  style={{ color: theme.colors.mutedText }}
                >
                  {scenario.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <Button
                  onClick={() => {
                    // All cards now proceed normally
                    saveUserChoice({
                      option: scenario.title,
                      path: scenario.path,
                      input: "",
                    });
                    console.log("User choice:", getUserChoice());
                    navigate(scenario.path);
                  }}
                  className="w-full mt-4 py-3 text-lg font-light"
                  style={{
                    backgroundColor: scenario.accentColor,
                    color: theme.isDark ? "#000000" : "#FFFFFF",
                  }}
                >
                  {scenario.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <ChatButton />
    </DefaultLayout>
  );
};

export default StartingFrom;
