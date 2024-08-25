"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { type ThemeContextType, Theme } from "../interfaces/context/theme.d";
import {
  getThemeFromStorage,
  setThemeToStorage
} from "../storage/localStorage";

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Theme>(
    () => getThemeFromStorage() ?? Theme.LIGHT
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    setThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = useMemo(() => {
    return () => {
      setTheme((prevTheme) =>
        prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      );
    };
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
