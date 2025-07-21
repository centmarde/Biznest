import React from 'react';
import Logo from './ui/logo';
import { useTheme } from '../theme/theme';

const Loader: React.FC = () => {
  const theme = useTheme();

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen w-full gap-8"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Logo />
      <div className="flex flex-col items-center">
        <div 
          className="w-10 h-10 rounded-full animate-spin"
          style={{ 
            borderWidth: '3px', 
            borderColor: `${theme.colors.primary}30`,
            borderTopColor: theme.colors.primary 
          }}
        ></div>
        <p 
          className="font-['Funnel_Sans'] text-base mt-4"
          style={{ color: theme.colors.primary }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
