import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useBusinessStepperStore } from "@/pages/biznest/data/memory-option-1"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, MapPin, Phone } from "lucide-react"
import { useTheme } from "@/theme/theme"

interface FormData {
  // Lot features
  lotFeatures: string[]
  lotFeaturesOther: string
  nearbyBusinesses: string
  crowdDensity: string
  areaDevelopment: string
  
  // Contact & Goals (Step 2)
  contactName: string
  email: string
  phone: string
  website: string
  additionalGoals: string
}

const steps = [
  {
    id: 1,
    title: "Lot Analysis",
    description: "Tell us about your lot's features and surroundings",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Contact & Goals",
    description: "Final details and objectives",
    icon: Phone,
  },
]

export default function BusinessStepper() {
  const theme = useTheme()
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    lotFeatures: [],
    lotFeaturesOther: "",
    nearbyBusinesses: "",
    crowdDensity: "",
    areaDevelopment: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    additionalGoals: "",
  })

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Save to Zustand store
    useBusinessStepperStore.getState().setInputs(formData);
    navigate("/biznest/lot-analysis-result");
  }

  const handleLotFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      updateFormData("lotFeatures", [...formData.lotFeatures, feature])
    } else {
      updateFormData(
        "lotFeatures",
        formData.lotFeatures.filter((f) => f !== feature),
      )
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 pb-4">
            {/* Question 1: Lot Features */}
            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>
                Lot Features (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Natural river on the back",
                  "Natural river on the front",
                  "Natural river on the side",
                  "Lake or pond nearby",
                  "Mountain view",
                  "Forest area",
                  "Open field",
                  "Garden/landscaped area",
                  "Parking space available",
                  "Multiple access roads",
                  "Corner lot",
                  "Elevated position"
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.lotFeatures.includes(feature)}
                      onCheckedChange={(checked) => handleLotFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm" style={{ color: theme.colors.text }}>
                      {feature}
                    </Label>
                  </div>
                ))}
                
                {/* Others checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="others"
                    checked={formData.lotFeatures.includes("Others")}
                    onCheckedChange={(checked) => handleLotFeatureChange("Others", checked as boolean)}
                  />
                  <Label htmlFor="others" className="text-sm" style={{ color: theme.colors.text }}>
                    Others
                  </Label>
                </div>
              </div>
              
              {/* Others input field - only show if "Others" is selected */}
              {formData.lotFeatures.includes("Others") && (
                <div className="mt-3">
                  <Label htmlFor="lotFeaturesOther" style={{ color: theme.colors.primary }}>
                    Please specify other features:
                  </Label>
                  <Input
                    id="lotFeaturesOther"
                    value={formData.lotFeaturesOther}
                    onChange={(e) => updateFormData("lotFeaturesOther", e.target.value)}
                    placeholder="e.g., historic building, underground utilities, etc."
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.tertiary,
                      color: theme.colors.text
                    }}
                  />
                </div>
              )}
            </div>

            {/* Question 2: Nearby Businesses */}
            <div className="space-y-2">
              <Label htmlFor="nearbyBusinesses" style={{ color: theme.colors.primary }}>
                Nearby Businesses
              </Label>
              <Textarea
                id="nearbyBusinesses"
                value={formData.nearbyBusinesses}
                onChange={(e) => updateFormData("nearbyBusinesses", e.target.value)}
                placeholder="e.g., McDonald's, Starbucks, gas station, shopping mall, hospital, school..."
                className="min-h-[80px]"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>

            {/* Question 3: Crowd Density/Traffic */}
            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>
                Crowd Density / Traffic Area
              </Label>
              <RadioGroup
                value={formData.crowdDensity}
                onValueChange={(value) => updateFormData("crowdDensity", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="crowd-low" />
                  <Label htmlFor="crowd-low" style={{ color: theme.colors.text }}>
                    Low - Quiet area with minimal foot traffic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="crowd-medium" />
                  <Label htmlFor="crowd-medium" style={{ color: theme.colors.text }}>
                    Medium - Moderate activity and regular traffic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="crowd-high" />
                  <Label htmlFor="crowd-high" style={{ color: theme.colors.text }}>
                    High - Busy area with heavy foot traffic
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Question 4: Area Development */}
            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>
                Area Development Level
              </Label>
              <RadioGroup
                value={formData.areaDevelopment}
                onValueChange={(value) => updateFormData("areaDevelopment", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="dev-low" />
                  <Label htmlFor="dev-low" style={{ color: theme.colors.text }}>
                    Low - Rural or underdeveloped area
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="dev-medium" />
                  <Label htmlFor="dev-medium" style={{ color: theme.colors.text }}>
                    Medium - Suburban with basic infrastructure
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="dev-high" />
                  <Label htmlFor="dev-high" style={{ color: theme.colors.text }}>
                    High - Urban area with full infrastructure
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="contactName" style={{ color: theme.colors.primary }}>Contact Person Name</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="John Doe"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: theme.colors.primary }}>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="john@example.com"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.tertiary,
                    color: theme.colors.text
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" style={{ color: theme.colors.primary }}>Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={{
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.tertiary,
                    color: theme.colors.text
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" style={{ color: theme.colors.primary }}>Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://www.yourwebsite.com"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalGoals" style={{ color: theme.colors.primary }}>Additional Goals & Notes</Label>
              <Textarea
                id="additionalGoals"
                value={formData.additionalGoals}
                onChange={(e) => updateFormData("additionalGoals", e.target.value)}
                placeholder="Any additional information about your business goals, challenges, or specific requirements..."
                className="min-h-[100px]"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-10xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: theme.colors.background }}>
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = currentStep > step.id
            const isCurrent = currentStep === step.id

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-colors"
                    style={{
                      backgroundColor: isCompleted 
                        ? theme.colors.primary 
                        : isCurrent 
                          ? theme.colors.background 
                          : theme.colors.background,
                      borderColor: isCompleted 
                        ? theme.colors.primary 
                        : isCurrent 
                          ? theme.colors.primary 
                          : theme.colors.tertiary,
                      color: isCompleted 
                        ? theme.colors.background 
                        : isCurrent 
                          ? theme.colors.primary 
                          : theme.colors.mutedText
                    }}
                  >
                    {isCompleted ? <Check className="w-3 h-3 sm:w-6 sm:h-6" /> : <Icon className="w-3 h-3 sm:w-6 sm:h-6" />}
                  </div>
                  <div className="mt-1 sm:mt-2 text-center">
                    <div 
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: isCurrent ? theme.colors.primary : theme.colors.mutedText }}
                    >
                      {step.title}
                    </div>
                    <div 
                      className="text-xs hidden sm:block"
                      style={{ color: theme.colors.mutedText }}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className="flex-1 h-0.5 mx-2 sm:mx-4 transition-colors"
                    style={{ backgroundColor: isCompleted ? theme.colors.primary : theme.colors.tertiary }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <Card 
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.tertiary,
          color: theme.colors.text
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: theme.colors.primary }}>
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription style={{ color: theme.colors.mutedText }}>
            {steps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="mt-4">
            {renderStepContent()}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentStep === 1}
          style={{
            borderColor: theme.colors.tertiary,
            color: currentStep === 1 ? theme.colors.mutedText : theme.colors.primary,
            backgroundColor: theme.colors.background
          }}
        >
          Previous
        </Button>

        {currentStep === steps.length ? (
          <Button 
            onClick={handleSubmit}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.secondary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary
            }}
          >
            Complete Analysis
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.secondary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary
            }}
          >
            Next
          </Button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2" style={{ color: theme.colors.mutedText }}>
          <span>Progress</span>
          <span>
            {currentStep} of {steps.length}
          </span>
        </div>
        <div className="w-full rounded-full h-2" style={{ backgroundColor: theme.colors.tertiary }}>
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentStep / steps.length) * 100}%`,
              backgroundColor: theme.colors.primary
            }}
          />
        </div>
      </div>
    </div>
  )
}