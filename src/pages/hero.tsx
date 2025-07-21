import  { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import LoginPage from '../components/login'
import RegisterPage from '../components/register'
import { ThemeProvider, useTheme } from '@/theme/theme'
import Logo from '../components/ui/logo'
import Loader from '../components/loader'

// We'll create a component that uses the theme
const ThemedHero = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  
  // Array of available background images
  const backgroundImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg'
  ];
  
  // Auto-carousel effect with random intervals
  useEffect(() => {
    const startCarousel = () => {
      // Random interval between 3-8 seconds
      const randomInterval = Math.floor(Math.random() * 5000) + 3000;
      
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex >= backgroundImages.length ? 1 : prevIndex + 1;
          return nextIndex;
        });
        startCarousel(); // Restart with new random interval
      }, randomInterval);
    };
    
    startCarousel();
  }, [backgroundImages.length]);
  
  const handleSwitchToRegister = () => {
    setShowLogin(false);
  };
  
  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Loader overlay */}
      {isPageLoading && (
        <div className="absolute inset-0 z-50">
          <Loader />
        </div>
      )}
      
      <div className="relative flex-3 bg-cover bg-center hidden md:block" 
           style={{ 
             backgroundImage: `url('${backgroundImages[currentImageIndex - 1]}')`,
             transition: 'background-image 1s ease-in-out'
           }}
           aria-label="Background Image">
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"></div>
        
        {/* Logo */}
        <div className="absolute top-5 left-5 z-10">
          <Logo />
        </div>
        
        {/* Hero Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-[90%]">
          {/* This section was empty in the original code */}
        </div>
      </div>
      
      <div className="flex-2 flex items-center justify-center md:flex-2"
           style={{ backgroundColor: theme.colors.background }}>
        {showLogin ? (
          <LoginPage 
            onSwitchToRegister={handleSwitchToRegister} 
            setIsPageLoading={setIsPageLoading} 
          />
        ) : (
          <RegisterPage 
            onSwitchToLogin={handleSwitchToLogin} 
            setIsPageLoading={setIsPageLoading} 
          />
        )}
      </div>
    </div>
  );
};

// Main component wrapped with ThemeProvider
const Hero = () => {
  return (
    <ThemeProvider>
      <ThemedHero />
    </ThemeProvider>
  );
};

export default Hero;
