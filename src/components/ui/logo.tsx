import React from 'react';
import { useTheme } from '../../theme/theme';

type LogoProps = {
  size?: 'default' | 'small';
  hideTagline?: boolean;
};

const Logo: React.FC<LogoProps> = ({ size = 'default', hideTagline = false }) => {
  const theme = useTheme();
  
  // Responsive sizes based on the size prop
  const iconSize = size === 'small' ? 'w-7 h-7' : 'w-10 h-10';
  const titleSize = size === 'small' ? 'text-lg' : 'text-2xl';
  const taglineSize = size === 'small' ? 'text-xs' : 'text-sm';
  // const taglineTop = size === 'small' ? 'top-[65%]' : 'top-[70%]';
  const gap = size === 'small' ? 'gap-1.5' : 'gap-2';
  
  return (
    <div className={`flex items-center ${gap}`}>
      <img 
       /*  src="/icons/icon.png" */ 
        alt="Biznest Logo"
        className={`${iconSize} object-contain`} 
      />
      <div className="relative flex flex-col">
        <h1 
          className={`font-['Funnel_Sans'] ${titleSize} font-bold m-0 leading-tight`}
          style={{ color: theme.colors.primary }}
        >
          Biznest
        </h1>
        {!hideTagline && (
          <p 
        className={`font-['Funnel_Sans'] ${taglineSize} font-normal -mt-1 tracking-wider ml-1`}
        style={{ color: '#d3d3d3' }}
          >
        City Planner
          </p>
        )}
      </div>
    </div>
  );
};

export default Logo;
