interface ColorPalette {
  primary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
}

export interface ColorPalettes {
  palette1: ColorPalette;
  palette2: ColorPalette;
  palette3: ColorPalette;
  palette4: ColorPalette;
  palette5: ColorPalette;
  // Ajoutez d'autres palettes ici si nécessaire
}

export const colorPalettes: ColorPalettes = {
  palette1: {
    primary: "#ff9800",
    error: "#e91e63",
    warning: "#ffcc00",
    info: "#2196f3",
    success: "#4caf50",
  },
  palette2: {
    primary: "#3f51b5",
    error: "#e91e63",
    warning: "#ff9800",
    info: "#2196f3",
    success: "#4caf50",
  },
  palette3: {
    primary: "#009688",
    error: "#e91e63",
    warning: "#ff9800",
    info: "#2196f3",
    success: "#4caf50",
  },
  palette4: {
    primary: "#673ab7",
    error: "#e91e63",
    warning: "#ff9800",
    info: "#2196f3",
    success: "#4caf50",
  },
  palette5: {
    primary: "#ffa6c9",
    error: "#e91e63",
    warning: "#ff9800",
    info: "#2196f3",
    success: "#4caf50",
  },
};
