import Hamburger from "hamburger-react";
import { useTheme } from "@mui/material";

interface BurgerMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
}

function BurgerMenuIcon({ isOpen, onClick }: BurgerMenuIconProps) {
  const theme = useTheme();
  return (
    <div className="menu-burger">
      <Hamburger
        toggled={isOpen}
        toggle={onClick}
        size={32}
        color={theme.palette.primary.main}
      />
    </div>
  );
}

export default BurgerMenuIcon;
