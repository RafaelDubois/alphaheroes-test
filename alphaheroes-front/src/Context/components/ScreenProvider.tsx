import React, { ReactNode } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ScreenContext from "./ScreenContext";

const ScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  const isTooSmall = useMediaQuery(
    "(max-height: 625px) and (max-width: 375px) and (orientation: portrait)"
  );
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLarge = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const isXLarge = useMediaQuery(theme.breakpoints.up("xl"));

  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");

  return (
    <ScreenContext.Provider
      value={{
        isTooSmall,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        isPortrait,
        isLandscape,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenProvider;
