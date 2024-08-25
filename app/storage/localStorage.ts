import { type Theme } from "../interfaces/context/theme";

export const setThemeToStorage = (theme: Theme): void => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("theme", theme);
  }
};

export const getThemeFromStorage = (): Theme | null => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("theme") as Theme;
  }

  return null;
};
