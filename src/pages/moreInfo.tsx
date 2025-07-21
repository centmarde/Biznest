import { ThemeProvider, useTheme } from '@/theme/theme'
import Logo from '../components/ui/logo'
import MoreInfoForm from '../components/more-info-form'

// Component that uses the theme
const ThemedMoreInfo = () => {
  const theme = useTheme();

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: theme.colors.background }}>
      <div className="relative flex-3 hidden md:flex md:items-center md:justify-center">
        {/* Logo */}
        <div className="absolute top-5 left-5 z-10">
          <Logo />
        </div>
        
        {/* Image with contain sizing */}
        <img 
          src="/misc/sign-in.png" 
          alt="Sign in illustration" 
          className="h-full w-150 object-contain"
        />
        
        {/* Hero Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[90%]">
          {/* This section can contain additional content if needed */}
        </div>
      </div>
      
      <div className="flex-2 flex items-center justify-center md:flex-2 flex-1">
        <MoreInfoForm />
      </div>
    </div>
  );
};

// Main component wrapped with ThemeProvider
const MoreInfo = () => {
  return (
    <ThemeProvider>
      <ThemedMoreInfo />
    </ThemeProvider>
  );
};

export default MoreInfo;
