import  { useState, useEffect } from 'react'
import LoginPage from '../components/login'
import RegisterPage from '../components/register'
import {useTheme } from '@/theme/theme'
import Logo from '../components/ui/logo'
import Loader from '../components/loader'
import { useIsMobile } from '@/utils/mobile'


// We'll create a component that uses the theme
const ThemedHero = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();
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
      const randomInterval = Math.floor(Math.random() * 5000) + 3000;
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex >= backgroundImages.length ? 1 : prevIndex + 1;
          return nextIndex;
        });
        startCarousel();
      }, randomInterval);
    };
    startCarousel();
  }, [backgroundImages.length]);

  const handleSwitchToRegister = () => setShowLogin(false);
  const handleSwitchToLogin = () => setShowLogin(true);

  return (
    <div
      className={`flex min-h-screen w-full relative ${isMobile ? 'flex-col' : 'md:flex-row'}`}
      style={isMobile ? { minHeight: '100dvh' } : {}}
    >
      {/* Loader overlay */}
      {isPageLoading && (
        <div className="absolute inset-0 z-50">
          <Loader />
        </div>
      )}

      {/* Background image section (top on mobile, left on desktop) */}
      <div
        className={`relative bg-cover bg-center ${isMobile ? 'w-full h-40 min-h-[120px] max-h-[180px]' : 'hidden md:block flex-3'}`}
        style={{
          backgroundImage: `url('${backgroundImages[currentImageIndex - 1]}')`,
          transition: 'background-image 1s ease-in-out',
          minHeight: isMobile ? 120 : '100vh',
          maxHeight: isMobile ? 180 : undefined,
          width: isMobile ? '100%' : undefined,
        }}
        aria-label="Background Image"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"></div>

        {/* Logo (desktop only) */}
        {!isMobile && (
          <div className="absolute top-5 left-5 z-10">
            <Logo />
          </div>
        )}
      </div>

      {/* Main content section (bottom on mobile, right on desktop) */}
      <div
        className={`flex flex-1 items-center justify-center w-full ${isMobile ? 'py-4 px-2' : 'md:flex-2'}`}
        style={{ backgroundColor: theme.colors.background }}
      >
        <div
          className={`w-full ${isMobile ? 'flex flex-col gap-2 items-center' : ''}`}
          style={isMobile ? { minWidth: 0, maxWidth: 400, width: '100%' } : {}}
        >
          {isMobile ? (
            <>
                <div className="mb-4 flex justify-center w-full relative">
                <div >
                  <Logo />
                </div>
                </div>
             
              <div className="mb-1 text-center">
                <span
                  className="text-xs"
                  style={{ fontSize: 12, ...theme.components.text.small }}
                >
                  {showLogin ? 'Sign in to access the City Planner system' : 'Create an account to join the preservation system'}
                </span>
              </div>
              <div className="w-full" style={{ minWidth: 0, maxWidth: 600, width: '100%', margin: '0 auto' }}>
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
            </>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemedHero;
