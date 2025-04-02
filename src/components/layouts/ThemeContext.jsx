// src/context/ThemeContext.js
import { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  // Load theme from localStorage or default to "light"
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("theme") || "light");

  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: { default: "#FFFFFF", paper: "#FFFFFF" },
      text: { primary: "#2D3748", secondary: "#4A5568" },
      primary: { main: "#3182CE" },
      secondary: { main: "#4A5568" },
      divider: "#E2E8F0",
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#1E2A44", paper: "#2E3B55" },
      text: { primary: "#F8F1E9", secondary: "#A0AEC0" },
      primary: { main: "#D4A017" },
      secondary: { main: "#A0AEC0" },
      divider: "#4A5568",
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
  });

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Select the current theme
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useThemeContext = () => useContext(ThemeContext);