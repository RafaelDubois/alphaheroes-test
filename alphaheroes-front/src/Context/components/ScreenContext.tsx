import { createContext } from "react";

interface ScreenContextType {
  isTooSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

const ScreenContext = createContext<ScreenContextType>({
  isTooSmall: false,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  isXLarge: false,
  isPortrait: false,
  isLandscape: false,
});

export default ScreenContext;
