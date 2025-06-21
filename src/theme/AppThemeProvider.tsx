import { ReactNode, useEffect, useState } from "react";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./themes";
import { AppThemeContext } from "./AppThemeContext";

const THEME_STORAGE_KEY = "appThemeMode";

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [appTheme, setAppTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const storedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedThemeMode === "dark") {
      setAppTheme(darkTheme);
    } else {
      setAppTheme(lightTheme);
    }
  }, []);

  const toggleTheme = () => {
    const currentThemeIsLight = appTheme === lightTheme;
    setAppTheme(currentThemeIsLight ? darkTheme : lightTheme);
    localStorage.setItem(
      THEME_STORAGE_KEY,
      currentThemeIsLight ? "dark" : "light",
    );
  };

  return (
    <AppThemeContext.Provider value={{ toggleTheme, appTheme }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}
