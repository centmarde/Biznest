"use client";

import type React from "react";
import { useState } from "react";
import { useUserAuth } from "@/auth/userAuth";
import { useNavigate } from "react-router-dom";
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

interface LoginProps {
  onSwitchToRegister?: () => void;
  setIsPageLoading?: (isLoading: boolean) => void;
}

// WelcomeGreeting component
const WelcomeGreeting = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  // Responsive style: shrink on mobile
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
const LoginContent = ({ onSwitchToRegister, setIsPageLoading }: LoginProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Default to 'BusinessOwner' if no selection
  const role = useUserAuth((state) => state.role) || "BusinessOwner";
  const setRole = useUserAuth((state) => state.setRole);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", email, password, role);
    // Role is already set via Zustand
    // Show loader overlay
    if (setIsPageLoading) {
      setIsPageLoading(true);
      // Navigate after 3 seconds
      setTimeout(() => {
        if (role === "BusinessOwner") {
          navigate("/biznest/startingform");
        } else {
          navigate("/home");
        }
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center  w-full max-w-[90%] mx-auto">
      <div className="flex flex-col w-full items-center">
        <Card
          className="w-full max-w-[100%] rounded-lg shadow-md text-sm"
          style={theme.components.card}
        >
          <CardHeader className="space-y-1 text-center">
            <WelcomeGreeting>
              Welcome! We're glad you're here 👋🏻
            </WelcomeGreeting>
            <CardDescription style={theme.components.text.small}>
              Sign in to access the City Planner system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex justify-end mt-1">
                  <a
                    href="/forgot-password"
                    className="text-sm hover:underline transition-colors duration-300"
                    style={{
                      color: theme.colors.secondary,
                      ...theme.components.text.small,
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" style={theme.components.text.body}>
                  Role
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  style={{ ...theme.components.input.base, minHeight: 40 }}
                >
                  <option value="LGU">LGU</option>
                  <option value="BusinessOwner">Business Owner</option>
                </select>
              </div>
              <Button
                type="submit"
                className="w-full rounded-md py-2.5 px-5 font-bold transition-colors duration-300"
                style={theme.components.button.primary.base}
              >
                Sign in
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
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-6">
                <Button
                  type="button"
                  aria-label="Sign in with Facebook"
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
                  aria-label="Sign in with Instagram"
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
                  aria-label="Sign in with GitHub"
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
              Don&apos;t have an account?{" "}
              <a
                onClick={onSwitchToRegister}
                className="font-medium hover:underline transition-colors duration-300 cursor-pointer"
                style={{ color: theme.colors.secondary }}
              >
                Create one
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default function LoginPage({
  onSwitchToRegister,
  setIsPageLoading,
}: LoginProps) {
  return (
    <ThemeProvider>
      <LoginContent
        onSwitchToRegister={onSwitchToRegister}
        setIsPageLoading={setIsPageLoading}
      />
    </ThemeProvider>
  );
}
