import React, { createContext, useContext, ReactNode, useState, FC } from 'react';

// Light theme colors
const lightColors = {
    primary: '#205781',      // Deep blue for primary actions and headers
    secondary: '#4F959D',    // Teal for secondary elements and hover states
    tertiary: '#98D2C0',     // Light teal for borders and subtle accents
    background: '#ffffff',   // White background
    text: '#151515',         // Dark text for good readability
    mutedText: '#6b7280',    // Gray for secondary text and descriptions
    card: '#ffffff',
};

// Dark theme colors
const darkColors = {
    primary: '#98D2C0',      // Light teal for primary elements in dark mode
    secondary: '#4F959D',    // Medium teal for secondary elements
    tertiary: '#374151',     // Dark gray for borders and subtle elements
    background: '#151515',   // Dark background
    text: '#ffffff',         // White text for contrast
    mutedText: '#9ca3af',    // Light gray for secondary text
    card: '#1f2937',
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
          backgroundColor: colors.primary,
        },
      },
      text: {
        base: {
          backgroundColor: 'transparent',
          color: colors.primary,
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          textDecoration: 'underline',
        },
        hover: {
          color: colors.secondary,
        },
      },
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${colors.tertiary}`,
    },
    input: {
      base: {
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: '6px',
        padding: '12px',
        border: `1px solid ${colors.tertiary}`,
        width: '100%',
      },
      hover: {
        borderColor: colors.primary,
      },
    },
    text: {
      heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: colors.primary,
      },
      body: {
        fontSize: '1rem',
        color: colors.text,
      },
      small: {
        fontSize: '0.875rem',
        color: colors.mutedText,
      },
    },
  },
});

// Theme context
const ThemeContext = createContext<ThemeType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = createTheme(isDark ? darkColors : lightColors, isDark, toggleTheme);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
