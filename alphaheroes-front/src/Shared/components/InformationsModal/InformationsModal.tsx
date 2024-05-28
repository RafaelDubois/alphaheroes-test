import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Fade,
  Modal,
  useTheme,
  Backdrop,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material";
import "./InformationsModal.css";
import ThemeContext from "../../../Context/components/ThemeContext"; //
import { Box } from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  SettingsBrightness as SystemModeIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import BurgerMenuIcon from "../../../Shared/components/BurgerMenuIcon/BurgerMenuIcon";
import { useStore } from "../../../Users/store/store";
import ScreenContext from "../../../Context/components/ScreenContext";

function InformationsModal() {
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const { isSmall } = useContext(ScreenContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const setCurrentParent = useStore((state) => state.setCurrentParent);
  const theme = useTheme();

  const buttons = [
    <Button
      key="LightModeIcon"
      sx={{
        borderRadius: "10px",
        backgroundColor:
          currentTheme === "light"
            ? alpha(theme.palette.primary.main, 0.2)
            : "inherit",
        border: "1.5px solid",
      }}
      onClick={() => toggleTheme("light")}
    >
      <LightModeIcon
        sx={{
          marginRight: "5px",
        }}
      />{" "}
      {!isSmall ? "Clair" : null}
    </Button>,
    <Button
      key="SystemModeIcon"
      sx={{
        backgroundColor:
          currentTheme === "system"
            ? alpha(theme.palette.primary.main, 0.2)
            : "inherit",
        border: "1.5px solid",
      }}
      onClick={() => toggleTheme("system")}
    >
      <SystemModeIcon
        sx={{
          marginRight: "5px",
        }}
      />{" "}
      {!isSmall ? "Système" : null}
    </Button>,
    <Button
      key="DarkModeIcon"
      sx={{
        borderRadius: "10px",
        backgroundColor:
          currentTheme === "dark"
            ? alpha(theme.palette.primary.main, 0.2)
            : "inherit",
        border: "1.5px solid",
      }}
      onClick={() => toggleTheme("dark")}
    >
      <DarkModeIcon
        sx={{
          marginRight: "5px",
        }}
      />{" "}
      {!isSmall ? "Sombre" : null}
    </Button>,
  ];

  const handleLogOut = () => {
    setOpen(false);
    setCurrentParent(null);
    navigate("/login");
  };

  return (
    <>
      <div>
        <BurgerMenuIcon
          isOpen={open}
          onClick={open ? handleClose : handleOpen}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              top: "50%",
              left: "50%",
              gap: "16px",
              transform: "translate(-50%, -50%)",
              width: "50vw",
              minWidth: "250px",
              height: "max-content",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonGroup
                color="primary"
                variant="outlined"
                aria-label="Medium-sized button group"
              >
                {buttons}
              </ButtonGroup>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
              }}
            >
              <Link id="home" onClick={() => handleClose()} className="settings-item" to="/account">
                Mon Compte
              </Link>
              <Link id="home" className="settings-item" to="/">
                Contacts
              </Link>
              <Link id="home" className="settings-item" to="/">
                Mentions légales
              </Link>
              <Typography
                onClick={() => handleLogOut()}
                sx={{ cursor: "pointer" }}
                id="home"
                className="settings-item"
                variant="body1"
                component={"h1"}
              >
                Déconnexion
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default InformationsModal;
