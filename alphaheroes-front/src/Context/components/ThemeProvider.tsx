import { useState, useMemo, ReactNode, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeContext from "./ThemeContext";
import { colorPalettes } from "./ColorPalettes";

// Définition de l'interface pour le composant fournisseur de thème
interface MyThemeProviderProps {
  children: ReactNode; // Les enfants du composant fournisseur de thème
}

export const MyThemeProvider: React.FC<MyThemeProviderProps> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState<"light" | "dark" | "system">(
    () =>
      (window.localStorage.getItem("darkMode") as
        | "light"
        | "dark"
        | "system") || "system"
  );

  useEffect(() => {
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const [colorPalette, setColorPalette] = useState(colorPalettes.palette1);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode:
            darkMode === "system"
              ? prefersDarkMode
                ? "dark"
                : "light"
              : darkMode,
          primary: { main: colorPalette.primary },
          error: { main: colorPalette.error },
          warning: { main: colorPalette.warning },
          info: { main: colorPalette.info },
          success: { main: colorPalette.success },
        },
        breakpoints: {
          values: { xs: 0, sm: 500, md: 750, lg: 1200, xl: 1536 },
        },
      }),
    [darkMode, colorPalette, prefersDarkMode]
  );

  useEffect(() => {
    const mode =
      darkMode === "system" ? (prefersDarkMode ? "dark" : "light") : darkMode;
    document.documentElement.style.setProperty(
      "--theme-background",
      mode === "dark" ? "#121212" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--theme-text",
      mode === "dark" ? "#fff" : "#121212"
    );
    document.documentElement.style.setProperty(
      "--theme-color",
      colorPalette.primary
    );
  }, [darkMode, colorPalette, prefersDarkMode]);

  const toggleTheme = (mode: "light" | "dark" | "system") => setDarkMode(mode);

  const changeColorPalette = (newPalette: keyof typeof colorPalettes) =>
    setColorPalette(colorPalettes[newPalette]);

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        changeColorPalette,
        currentTheme: darkMode,
        colorPalette,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
