import { createContext, useState, useMemo } from "react";
import { Theme, createTheme } from "@mui/material/styles";

type ThemeSettings = (mode: 'dark' | 'light') => {
  palette: {
    mode: 'dark' | 'light';
    primary: {
      main: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    h1: {
      fontFamily: string;
      fontSize: number;
    };
  };
};
type ColorToken = {
  main: string;
  light?: string;
  dark?: string;
};

type Tokens = {
  primary: ColorToken;
  secondary: ColorToken;
};
export const tokens = (mode: 'dark' | 'light'): Tokens => ({
  ...(mode === "dark"
    ? {
      // Define colors for dark mode
      primary: {
        main: "#008c99",
        light: "#f1fafb", // Example: neutralLighterAlt as neutral light
        dark: "#006b74", // Example: neutralDark as neutral dark

      },
      secondary: {
        light: "#f8f8f8", // Example: neutralLighterAlt as neutral light
        main: "#1499a5", // Example: neutralLight as neutral main
        dark: "#2c4d82", // Example: neutralDark as neutral dark
      },

    }
    : {

      primary: {
        main: "#008c99",
        light: "#f1fafb", 
        dark: "#004f56",
      },
      secondary: {
        light: "#c8c8c8",
        main: "#4c74b5", 
        dark: "#2c4d82", 
      },

    }),
  // ... other color categories (if any)
});

export const themeSettings: ThemeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      primary: {
       dark: colors.primary.dark,
        main: colors.primary.main,
        light: colors.primary.light,
      },
      secondary: {
        dark: colors.secondary.dark,
        main: colors.secondary.main,
        light: colors.secondary.light,
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    }
    // ... other theme settings (components, etc.) if any
  };
};

interface ColorModeContextType {
  toggleColorMode: () => void;
}

// context for color mode
export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => { },
});

export const useMode = (): [Theme, ColorModeContextType] => {
  const [mode, setMode] = useState<'dark' | 'light'>('light');

  const colorMode = useMemo<ColorModeContextType>(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo<Theme>(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
