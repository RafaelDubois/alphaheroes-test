import { createContext } from "react";
import { colorPalettes } from "./ColorPalettes";

export interface ThemeContextProps {
  toggleTheme: (mode: "light" | "dark" | "system") => void;
  changeColorPalette: (newPalette: keyof typeof colorPalettes) => void;
  currentTheme: "light" | "dark" | "system";
  colorPalette: typeof colorPalettes[keyof typeof colorPalettes];
  setColorPalette?: (
    palette: typeof colorPalettes[keyof typeof colorPalettes]
  ) => void;
}

const defaultColorPalette = colorPalettes.palette1;

const ThemeContext = createContext<ThemeContextProps>({
  toggleTheme: () => {},
  changeColorPalette: () => {},
  currentTheme: "system",
  colorPalette: defaultColorPalette,
  setColorPalette: () => {},
});

export default ThemeContext;
