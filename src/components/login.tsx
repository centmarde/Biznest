"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Github, Facebook, Instagram } from "lucide-react"
import { ThemeProvider, useTheme } from "@/theme/theme"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginProps {
  onSwitchToRegister?: () => void;
  setIsPageLoading?: (isLoading: boolean) => void;
}

// WelcomeGreeting component
const WelcomeGreeting = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <h2 className="text-xl font-semibold mb-4" style={theme.components.text.heading}>
      {children}
    </h2>
  );
};

// Wrapper component that uses the theme
const LoginContent = ({ onSwitchToRegister, setIsPageLoading }: LoginProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt with:", email, password)
    
    // Show loader overlay
    if (setIsPageLoading) {
      setIsPageLoading(true);
      
      // Navigate after 3 seconds
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  }

  return (
    
    <div className="flex items-center justify-center p-4 w-full max-w-[90%] mx-auto">
      <div className="flex flex-col w-full items-center">
        <WelcomeGreeting>
          Welcome! We're glad you're here 👋🏻
        </WelcomeGreeting>
        
        <Card className="w-full max-w-[80%] bg-[#F6F8D5] border border-[#98D2C0] rounded-lg shadow-md text-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold" style={theme.components.text.heading}>
              Title here
            </CardTitle>
            <CardDescription style={theme.components.text.small}>
              Sign in to access the preservation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={theme.components.text.body}>Email</Label>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" style={theme.components.text.body}>Password</Label>
                  <a href="/forgot-password" className="text-sm text-[#205781] hover:text-[#4F959D] hover:underline transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={theme.components.input.base}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#205781] text-[#F6F8D5] rounded-md py-2.5 px-5 font-bold hover:bg-[#4F959D] transition-colors duration-300"
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
                  <span className="bg-white px-2" style={theme.components.text.small}>Or continue with</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-6">
                <Button 
                  type="button" 
                  aria-label="Sign in with Facebook"
                  className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] hover:transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Facebook className="h-5 w-5 text-[#205781]" />
                </Button>
                <Button 
                  type="button" 
                  aria-label="Sign in with Instagram"
                  className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] hover:transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5 text-[#205781]" />
                </Button>
                <Button 
                  type="button" 
                  aria-label="Sign in with GitHub"
                  className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] hover:transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Github className="h-5 w-5 text-[#205781]" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm" style={theme.components.text.small}>
              Don&apos;t have an account?{" "}
              <a 
                onClick={onSwitchToRegister} 
                className="font-medium text-[#205781] hover:text-[#4F959D] hover:underline transition-colors duration-300 cursor-pointer"
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

export default function LoginPage({ onSwitchToRegister, setIsPageLoading }: LoginProps) {
  return (
    <ThemeProvider>
      <LoginContent onSwitchToRegister={onSwitchToRegister} setIsPageLoading={setIsPageLoading} />
    </ThemeProvider>
  )
}
