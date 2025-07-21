import React, { createContext, useContext, ReactNode, useState } from 'react';

// Light theme colors
const lightColors = {
    primary: '#151515',
    secondary: '#151515',
    tertiary: '#151515',
    background: '#ffffff',
    text:'#151515',
    mutedText: '#151515',
};

// Dark theme colors
const darkColors = {
    primary: '#ffffff',
    secondary: '#e5e5e5',
    tertiary: '#d1d1d1',
    background: '#151515',
    text: '#ffffff',
    mutedText: '#e5e5e5',
};

// Custom style interfaces with hover states
interface StyleWithHover {
  base: React.CSSProperties;
  hover?: React.CSSProperties;
}

interface TextStyles {
  heading: React.CSSProperties;
  body: React.CSSProperties;
  small: React.CSSProperties;
}

// Theme interface
interface ThemeType {
  colors: typeof lightColors;
  components: {
    button: {
      primary: StyleWithHover;
      secondary: StyleWithHover;
      text: StyleWithHover;
    };
    card: React.CSSProperties;
    input: StyleWithHover;
    text: TextStyles;
  };
  isDark: boolean;
  toggleTheme: () => void;
}

// Create a function to generate theme based on colors
const createTheme = (colors: typeof lightColors, isDark: boolean, toggleTheme: () => void): ThemeType => ({
  colors,
  isDark,
  toggleTheme,
  components: {
    button: {
      primary: {
        base: {
          backgroundColor: colors.primary,
          color: colors.background,
          borderRadius: '6px',
          padding: '10px 20px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        },
        hover: {
          backgroundColor: colors.secondary,
        },
      },
      secondary: {
        base: {
          backgroundColor: colors.secondary,
          color: colors.background,
          borderRadius: '6px',
          padding: '10px 20px',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        },
        hover: {
          backgroundColor: colors.tertiary,
        },
      },
      text: {
        base: {
          backgroundColor: 'transparent',
          color: colors.primary,
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
        },
        hover: {
          color: colors.secondary,
        },
      },
    },
    card: {
      backgroundColor: colors.background,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: `0 4px 8px rgba(76, 88, 91, 0.1)`,
      border: `1px solid ${colors.tertiary}`,
    },
    input: {
      base: {
        backgroundColor: colors.background,
        border: `1px solid ${colors.tertiary}`,
        borderRadius: '4px',
        padding: '10px 12px',
        color: colors.primary,
        transition: 'border-color 0.3s ease',
      },
      hover: {
        outline: 'none',
        borderColor: colors.secondary,
      },
    },
    text: {
      heading: {
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: '16px',
      },
      body: {
        color: colors.primary,
        fontSize: '16px',
        lineHeight: 1.5,
      },
      small: {
        color: colors.secondary,
        fontSize: '14px',
      },
    },
  },
});

// Create context
const ThemeContext = createContext<ThemeType | undefined>(undefined);

// Custom hook for using the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or default to light mode
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return false;
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    }
  };

  const currentTheme = createTheme(isDark ? darkColors : lightColors, isDark, toggleTheme);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the theme
export default lightColors;
