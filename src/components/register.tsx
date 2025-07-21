"use client"

import type React from "react"
import { useState } from "react"
import { Github, Facebook, Instagram } from "lucide-react"
import { ThemeProvider, useTheme } from "@/theme/theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
// import Loader from "../components/loader"


interface RegisterProps {
  onSwitchToLogin?: () => void;
  setIsPageLoading?: (value: boolean) => void;
}

// Wrapper component that uses the theme
const RegisterContent = ({ onSwitchToLogin, setIsPageLoading }: RegisterProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log("Registration attempt with:", name, email, password)
    
    // Set loading state at the page level
    if (setIsPageLoading) {
      setIsPageLoading(true)
      
      // Navigate after 5 seconds
      setTimeout(() => {
        navigate("/more-info")
      }, 5000)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 w-full max-w-[90%] mx-auto">
      <Card className="w-full max-w-[80%] bg-[#F6F8D5] border border-[#98D2C0] rounded-lg shadow-md text-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold" style={theme.components.text.heading}>
            Biznest
          </CardTitle>
          <CardDescription style={theme.components.text.small}>
            Create an account to join the preservation system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center my-4 text-lg font-medium text-[#205781]">
            Join our community today! 👋🏻
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" style={theme.components.text.body}>Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                style={theme.components.input.base}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" style={theme.components.text.body}>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                style={theme.components.input.base}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" style={theme.components.text.body}>Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                style={theme.components.input.base}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" style={theme.components.text.body}>Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
                style={theme.components.input.base}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#205781] text-[#F6F8D5] rounded-md py-2 px-5 font-bold hover:bg-[#4F959D] transition-colors"
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
                <span className="bg-white px-2" style={theme.components.text.small}>Or register with</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-6">
              <Button 
                type="button" 
                aria-label="Register with Facebook"
                className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] transition-transform hover:translate-y-[-2px]"
              >
                <Facebook className="h-5 w-5 text-[#205781]" />
              </Button>
              <Button 
                type="button" 
                aria-label="Register with Instagram"
                className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] transition-transform hover:translate-y-[-2px]"
              >
                <Instagram className="h-5 w-5 text-[#205781]" />
              </Button>
              <Button 
                type="button" 
                aria-label="Register with GitHub"
                className="bg-transparent border border-[#98D2C0] rounded-full w-10 h-10 p-0 flex items-center justify-center hover:bg-[rgba(152,210,192,0.1)] transition-transform hover:translate-y-[-2px]"
              >
                <Github className="h-5 w-5 text-[#205781]" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm" style={theme.components.text.small}>
            Already have an account?{" "}
            <a 
              onClick={onSwitchToLogin} 
              className="font-medium text-[#205781] hover:text-[#4F959D] hover:underline cursor-pointer transition-colors"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function RegisterPage({ onSwitchToLogin, setIsPageLoading }: RegisterProps) {
  return (
    <ThemeProvider>
      <RegisterContent onSwitchToLogin={onSwitchToLogin} setIsPageLoading={setIsPageLoading} />
    </ThemeProvider>
  )
}
