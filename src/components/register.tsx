"use client";

import type React from "react";
import { useState } from "react";
import { Github, Facebook, Instagram, Eye, EyeOff } from "lucide-react";
import { ThemeProvider, useTheme } from "@/theme/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onSwitchToLogin?: () => void;
  setIsPageLoading?: (value: boolean) => void;
}

// WelcomeGreeting component for consistency
const WelcomeGreeting = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <h2
      className="font-semibold mb-2 text-xl sm:text-xl md:text-2xl lg:text-2xl"
      style={{
        ...theme.components.text.heading,
        fontSize: "clamp(1rem, 4vw, 1.25rem)",
        marginBottom: 8,
      }}
    >
      {children}
    </h2>
  );
};

// Wrapper component that uses the theme
const RegisterContent = ({
  onSwitchToLogin,
  setIsPageLoading,
}: RegisterProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration attempt with:", name, email, password);

    // Set loading state at the page level
    if (setIsPageLoading) {
      setIsPageLoading(true);

      // Navigate after 5 seconds
      setTimeout(() => {
        navigate("/more-info");
      }, 5000);
    }
  };

  return (
    <div className="flex items-center justify-center w-full max-w-[90%] mx-auto">
      <div className="flex flex-col w-full items-center">
        <Card
          className="w-full max-w-[100%] rounded-lg shadow-md text-sm"
          style={theme.components.card}
        >
          <CardHeader className="space-y-1 text-center">
            <WelcomeGreeting>Join our community today! 👋🏻</WelcomeGreeting>
            <CardDescription style={theme.components.text.small}>
              Create an account to join the City Planner system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" style={theme.components.text.body}>
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={theme.components.input.base}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" style={theme.components.text.body}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={theme.components.input.base}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" style={theme.components.text.body}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={theme.components.input.base}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  style={theme.components.text.body}
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={theme.components.input.base}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full rounded-md py-2.5 px-5 font-bold transition-colors duration-300"
                style={theme.components.button.primary.base}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span
                    className="px-2"
                    style={{
                      backgroundColor: theme.colors.background,
                      ...theme.components.text.small,
                    }}
                  >
                    Or register with
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-6">
                <Button
                  type="button"
                  aria-label="Register with Facebook"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:transform hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.colors.tertiary}`,
                  }}
                >
                  <Facebook
                    className="h-5 w-5"
                    style={{ color: theme.colors.primary }}
                  />
                </Button>
                <Button
                  type="button"
                  aria-label="Register with Instagram"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:transform hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.colors.tertiary}`,
                  }}
                >
                  <Instagram
                    className="h-5 w-5"
                    style={{ color: theme.colors.primary }}
                  />
                </Button>
                <Button
                  type="button"
                  aria-label="Register with GitHub"
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center hover:transform hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.colors.tertiary}`,
                  }}
                >
                  <Github
                    className="h-5 w-5"
                    style={{ color: theme.colors.primary }}
                  />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-2 flex justify-center">
            <p className="text-sm" style={theme.components.text.small}>
              Already have an account?{" "}
              <a
                onClick={onSwitchToLogin}
                className="font-medium hover:underline transition-colors duration-300 cursor-pointer"
                style={{ color: theme.colors.secondary }}
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default function RegisterPage({
  onSwitchToLogin,
  setIsPageLoading,
}: RegisterProps) {
  return (
    <ThemeProvider>
      <RegisterContent
        onSwitchToLogin={onSwitchToLogin}
        setIsPageLoading={setIsPageLoading}
      />
    </ThemeProvider>
  );
}
