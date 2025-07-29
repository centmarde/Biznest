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

const StartingFrom: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const scenarios = [
    {
      title: "I have a lot but don’t know what business to build",
      description: "Let us help you identify the best business for your location.",
      cta: "Select this option",
      icon: "🏡",
    },
    {
      title: "I want to start a business but don’t own land",
      description:
        "We'll guide you to the ideal location to bring your business idea to life.",
      cta: "Select this option",
      icon: "🚀",
    },
    {
      title: "I have a business but don’t know where to set it up",
      description:
        "We’ll help you find the best place to expand or relocate your business.",
      cta: "Select this option",
      icon: "📍",
    },
  ];

  return (
    <DefaultLayout>
      <div
        className="min-h-screen flex flex-col items-center p-4 pt-10"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ color: theme.colors.primary }}
          >
            What describes your current business situation?
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {scenarios.map((scenario, index) => (
            <Card
              key={index}
              className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out"
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.tertiary,
              }}
            >
              <CardHeader className="flex-grow p-8">
                <div className="text-6xl mb-5">{scenario.icon}</div>
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
                  onClick={() => navigate("/biznest/form")}
                  className="w-full mt-4 py-3 text-lg"
                  style={{
                    backgroundColor: theme.colors.primary,
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
