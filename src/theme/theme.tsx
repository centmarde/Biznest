import React, { createContext, useContext, ReactNode, useState } from 'react';

// Light theme colors
const lightColors = {
    primary: '#205781',      // Deep blue for primary actions and headers
    secondary: '#4F959D',    // Teal for secondary elements and hover states
    tertiary: '#98D2C0',     // Light teal for borders and subtle accents
    background: '#ffffff',   // White background
    text: '#151515',         // Dark text for good readability
    mutedText: '#6b7280',    // Gray for secondary text and descriptions
};

// Dark theme colors
const darkColors = {
    primary: '#98D2C0',      // Light teal for primary elements in dark mode
    secondary: '#4F959D',    // Medium teal for secondary elements
    tertiary: '#374151',     // Dark gray for borders and subtle elements
    background: '#151515',   // Dark background
    text: '#ffffff',         // White text for contrast
    mutedText: '#9ca3af',    // Light gray for secondary text
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

  // Apply initial background color immediately
  React.useEffect(() => {
    const colors = isDark ? darkColors : lightColors;
    document.body.style.backgroundColor = colors.background;
    document.documentElement.style.backgroundColor = colors.background;
    document.body.style.transition = 'background-color 0.3s ease';
    document.documentElement.style.transition = 'background-color 0.3s ease';
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Immediately apply background color change to avoid delay
    const newColors = newTheme ? darkColors : lightColors;
    document.body.style.backgroundColor = newColors.background;
    document.documentElement.style.backgroundColor = newColors.background;
    
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
