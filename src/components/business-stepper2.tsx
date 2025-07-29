import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Building, Users, Target, Phone } from "lucide-react"
import { useTheme } from "@/theme/theme"

interface FormData {
  // Step 1: Business Description
  businessName: string
  businessDescription: string
  industry: string

  // Step 2: Business Size
  employeeCount: string
  revenueRange: string
  businessAge: string

  // Step 3: Business Type & Target Market
  businessType: string
  targetMarket: string[]
  primaryGoal: string

  // Step 4: Contact & Goals
  contactName: string
  email: string
  phone: string
  website: string
  additionalGoals: string
}

const steps = [
  {
    id: 1,
    title: "Business Description",
    description: "Tell us about your business",
    icon: Building,
  },
  {
    id: 2,
    title: "Business Size",
    description: "What's the size of your business?",
    icon: Users,
  },
  {
    id: 3,
    title: "Business Type & Market",
    description: "Define your business model",
    icon: Target,
  },
  {
    id: 4,
    title: "Contact & Goals",
    description: "Final details and objectives",
    icon: Phone,
  },
]

export default function BusinessStepper() {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessDescription: "",
    industry: "",
    employeeCount: "",
    revenueRange: "",
    businessAge: "",
    businessType: "",
    targetMarket: [],
    primaryGoal: "",
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
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
    
    // Get the 'from' query parameter to determine where to navigate
    const searchParams = new URLSearchParams(location.search)
    const fromForm = searchParams.get('from')
    
    switch (fromForm) {
      case 'business-idea':
        navigate("/biznest/business-idea-result");
        break;
      case 'expansion':
        navigate("/biznest/expansion-result");
        break;
      case 'lot-analysis':
      default:
        navigate("/biznest/lot-analysis-result");
        break;
    }
  }

  const handleTargetMarketChange = (market: string, checked: boolean) => {
    if (checked) {
      updateFormData("targetMarket", [...formData.targetMarket, market])
    } else {
      updateFormData(
        "targetMarket",
        formData.targetMarket.filter((m) => m !== market),
      )
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" style={{ color: theme.colors.primary }}>Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => updateFormData("businessName", e.target.value)}
                placeholder="Your Business Name"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessDescription" style={{ color: theme.colors.primary }}>Business Description</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => updateFormData("businessDescription", e.target.value)}
                placeholder="Describe what your business does, your products or services..."
                className="min-h-[100px]"
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" style={{ color: theme.colors.primary }}>Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 pb-4">
            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>Number of Employees</Label>
              <RadioGroup
                value={formData.employeeCount}
                onValueChange={(value) => updateFormData("employeeCount", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="just-me" id="just-me" />
                  <Label htmlFor="just-me" style={{ color: theme.colors.text }}>Just me (Solo entrepreneur)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-10" id="2-10" />
                  <Label htmlFor="2-10" style={{ color: theme.colors.text }}>2-10 employees</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="11-50" id="11-50" />
                  <Label htmlFor="11-50" style={{ color: theme.colors.text }}>11-50 employees</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="51-200" id="51-200" />
                  <Label htmlFor="51-200" style={{ color: theme.colors.text }}>51-200 employees</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="200+" id="200+" />
                  <Label htmlFor="200+" style={{ color: theme.colors.text }}>200+ employees</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>Annual Revenue Range</Label>
              <RadioGroup
                value={formData.revenueRange}
                onValueChange={(value) => updateFormData("revenueRange", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-50k" id="0-50k" />
                  <Label htmlFor="0-50k" style={{ color: theme.colors.text }}>$0 - $50,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50k-250k" id="50k-250k" />
                  <Label htmlFor="50k-250k" style={{ color: theme.colors.text }}>$50,000 - $250,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="250k-1m" id="250k-1m" />
                  <Label htmlFor="250k-1m" style={{ color: theme.colors.text }}>$250,000 - $1,000,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1m-5m" id="1m-5m" />
                  <Label htmlFor="1m-5m" style={{ color: theme.colors.text }}>$1M - $5M</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5m+" id="5m+" />
                  <Label htmlFor="5m+" style={{ color: theme.colors.text }}>$5M+</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessAge" style={{ color: theme.colors.primary }}>How long has your business been operating?</Label>
              <Select value={formData.businessAge} onValueChange={(value) => updateFormData("businessAge", value)}>
                <SelectTrigger style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectValue placeholder="Select business age" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectItem value="startup">Just starting (0-1 years)</SelectItem>
                  <SelectItem value="early">Early stage (1-3 years)</SelectItem>
                  <SelectItem value="established">Established (3-10 years)</SelectItem>
                  <SelectItem value="mature">Mature (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6 pb-4">
            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>Business Type</Label>
              <RadioGroup
                value={formData.businessType}
                onValueChange={(value) => updateFormData("businessType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2b" id="b2b" />
                  <Label htmlFor="b2b" style={{ color: theme.colors.text }}>B2B (Business to Business)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="b2c" id="b2c" />
                  <Label htmlFor="b2c" style={{ color: theme.colors.text }}>B2C (Business to Consumer)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" style={{ color: theme.colors.text }}>Both B2B and B2C</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label style={{ color: theme.colors.primary }}>Target Market (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Local customers",
                  "National customers",
                  "International customers",
                  "Small businesses",
                  "Enterprise clients",
                  "Young adults (18-35)",
                  "Middle-aged (35-55)",
                  "Seniors (55+)",
                ].map((market) => (
                  <div key={market} className="flex items-center space-x-2">
                    <Checkbox
                      id={market}
                      checked={formData.targetMarket.includes(market)}
                      onCheckedChange={(checked) => handleTargetMarketChange(market, checked as boolean)}
                    />
                    <Label htmlFor={market} className="text-sm" style={{ color: theme.colors.text }}>
                      {market}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryGoal" style={{ color: theme.colors.primary }}>Primary Business Goal</Label>
              <Select value={formData.primaryGoal} onValueChange={(value) => updateFormData("primaryGoal", value)}>
                <SelectTrigger style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectValue placeholder="Select your primary goal" />
                </SelectTrigger>
                <SelectContent style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.tertiary,
                  color: theme.colors.text
                }}>
                  <SelectItem value="increase-revenue">Increase Revenue</SelectItem>
                  <SelectItem value="expand-market">Expand Market Reach</SelectItem>
                  <SelectItem value="improve-efficiency">Improve Operational Efficiency</SelectItem>
                  <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                  <SelectItem value="customer-satisfaction">Improve Customer Satisfaction</SelectItem>
                  <SelectItem value="cost-reduction">Reduce Costs</SelectItem>
                  <SelectItem value="innovation">Drive Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
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

        {currentStep === 4 ? (
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
            Complete Setup
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
