import React, { useState } from "react";
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

const StartingFrom: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const saveUserChoice = useUserChoiceStore(state => state.saveUserChoice);
  const getUserChoice = useUserChoiceStore(state => state.getUserChoice);

  const scenarios = [
    {
      title: "I have a lot but don’t know what business to build",
      description: "Let us help you identify the best business for your location.",
      cta: "Select this option",
      icon: "🏡",
      path: "/biznest/forms/lot-analysis",
      accentColor: theme.colors.primary,
    },
    {
      title: "I want to start a business but don’t own land",
      description:
        "We'll guide you to the ideal location to bring your business idea to life.",
      cta: "Select this option",
      icon: "🚀",
      path: "/biznest/forms/business-idea",
      accentColor: theme.colors.secondary,
    },
    {
      title: "I have a business but don’t know where to set it up",
      description:
        "We’ll help you find the best place to expand or relocate your business.",
      cta: "Select this option",
      icon: "📍",
      path: "/biznest/forms/expansion",
      accentColor: "#FFC107", // A distinct accent color
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl w-full">
          {scenarios.map((scenario, index) => (
            <Card
              key={index}
              className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.tertiary,
                borderTop: `5px solid ${scenario.accentColor}`,
              }}
            >
              <CardHeader className="flex-grow p-8">
                <div className="text-6xl mb-5" style={{ color: scenario.accentColor }}>{scenario.icon}</div>
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
                {/* Optional user input field for additional info */}
                {selectedIndex === index && (
                  <input
                    type="text"
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Add details (optional)"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                  />
                )}
                <Button
                  onClick={() => {
                    setSelectedIndex(index);
                    saveUserChoice({
                      option: scenario.title,
                      path: scenario.path,
                      input: userInput,
                    });
                    console.log("User choice:", getUserChoice());
                    navigate(scenario.path);
                  }}
                  className="w-full mt-4 py-3 text-lg"
                  style={{
                    backgroundColor: scenario.accentColor,
                    color: theme.isDark ? theme.colors.text : theme.colors.background,
                  }}
                >
                  {scenario.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default StartingFrom;
