import { useContext } from "react";
import { useLocation } from "react-router-dom";
import ScreenContext from "./ScreenContext";
import ScreenModal from "./ScreenModal";

// Définition en tant que composant fonctionnel externe
export default function LocationAwareModal() {
  const location = useLocation();
  const { isSmall, isPortrait, isTooSmall } = useContext(ScreenContext); // Assurez-vous d'importer useContext

  if ((isSmall && isPortrait && location.pathname !== "/") || isTooSmall) {
    return <ScreenModal />;
  }
  return null;
}
