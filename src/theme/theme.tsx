import React, { createContext, useContext, ReactNode } from 'react';

// Color palette
const colors = {
    primary: '#113F67',
    secondary: '#34699A',
    tertiary: '#58A0C8',
    background: '#FDF5AA',
    text:'#113F67',
    mutedText: '#58A0C8',
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
  colors: typeof colors;
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
}

// Define the theme
const theme: ThemeType = {
  colors,
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
};

// Create context
const ThemeContext = createContext<ThemeType>(theme);

// Custom hook for using the theme
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Export the theme
export default theme;
