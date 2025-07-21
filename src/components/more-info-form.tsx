"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeProvider, useTheme } from "@/theme/theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Wrapper component that uses the theme
const MoreInfoFormContent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [organization, setOrganization] = useState("")
  const [role, setRole] = useState("")
  const [phone, setPhone] = useState("")
  const [interests, setInterests] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted with:", organization, role, phone, interests)
    // Navigate to home page after form submission
    navigate('/home');
  }

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full max-w-[90%] mx-auto">
     
      
      <div className="flex items-center justify-center w-full">
        
        <Card className="w-full max-w-[80%] bg-[#F6F8D5] border border-[#98D2C0] rounded-lg shadow-md text-sm">
        <div className="mb-4 self-start">
        <Button 
          onClick={handleGoBack}
          variant="ghost" 
          size="sm"
          className="flex items-center text-[#205781] hover:text-[#4F959D] hover:bg-[#E8ECBA] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
          <CardHeader className="space-y-1 text-center relative">
            <CardTitle className="text-2xl font-bold mt-6" style={theme.components.text.heading}>
             Biznest
            </CardTitle>
            <CardDescription style={theme.components.text.small}>
              Please provide additional information about yourself
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center my-4 text-lg font-medium text-[#205781]">
              Help us know you better! 🌍
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organization" style={theme.components.text.body}>Organization</Label>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Your organization name"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full"
                  style={theme.components.input.base}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" style={theme.components.text.body}>Role/Position</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="Your role in the organization"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full"
                  style={theme.components.input.base}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" style={theme.components.text.body}>Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                  style={theme.components.input.base}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests" style={theme.components.text.body}>Label Here</Label>
                <Input
                  id="interests"
                  type="text"
                  placeholder="Tell us about your interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full"
                  style={theme.components.input.base}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#205781] text-[#F6F8D5] rounded-md py-2 px-5 font-bold hover:bg-[#4F959D] transition-colors"
              >
                Submit Information
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm" style={theme.components.text.small}>
              Thank you for contribution.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default function MoreInfoForm() {
  return (
    <ThemeProvider>
      <MoreInfoFormContent />
    </ThemeProvider>
  )
}
