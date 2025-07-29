import BusinessStepper from '@/components/business-stepper'
import DefaultLayout from '@/layout/default'
import { useTheme } from '@/theme/theme'
import ChatButton from "@/components/AIrelated/ChatButton"
export default function BiznestForm() {
  const theme = useTheme()
  
  return (
    <DefaultLayout>
      <div className="min-h-screen " style={{ backgroundColor: theme.colors.background }}>
        <div className="container py-2 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h1 
              className="text-3xl font-bold tracking-tight mb-1"
              style={{ color: theme.colors.primary }}
            >
              Business Setup
            </h1>
            <p style={{ color: theme.colors.mutedText }}>
              Complete your business information to get started with Biznest
            </p>
          </div>
            <ChatButton />
          <BusinessStepper />
          
        </div>
        {/* Add ChatButton floating on this page */}
      
      </div>
    </DefaultLayout>
  )
}
