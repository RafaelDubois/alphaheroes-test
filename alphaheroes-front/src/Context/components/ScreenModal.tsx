import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import ScreenContext from "./ScreenContext";
import LandscapeRotate from "../assets/landscapeRotate.png";
// import { useLocation } from "react-router-dom";

const ScreenModal: React.FC = () => {
  const { isSmall, isPortrait, isTooSmall } = useContext(ScreenContext);
  const theme = useTheme();
  // const location = useLocation()

  return (
    // location.pathname !== "/" &&
    <>
      {isSmall && isPortrait && (
        <Modal
          open={true}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: theme.palette.background.default,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={LandscapeRotate} alt="" style={{ maxWidth: "100%" }} />
            <h2
              style={{ textAlign: "center", color: theme.palette.primary.main }}
            >
              Tourne l'appareil pour utiliser l'application
            </h2>
          </div>
        </Modal>
      )}
      {isTooSmall && (
        <Modal
          open={true}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: theme.palette.background.default,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2
              style={{ textAlign: "center", color: theme.palette.primary.main }}
            >
              L'écran est trop petit pour utiliser l'application
            </h2>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ScreenModal;
