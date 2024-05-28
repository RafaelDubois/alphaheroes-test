import "./Profiles.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import Logo from "../../../Shared/assets/logos/logo_1.png";
import ScreenContext from "../../../Context/components/ScreenContext";
import { useContext, useEffect, useState } from "react";
import { useStore, Profile } from "../../store/store";
import ModalNewProfile from "../../components/ModalNewProfile";
import ThemeContext from "../../../Context/components/ThemeContext";
import { colorPalettes } from "../../../Context/components/ColorPalettes";

function Profiles() {
  const theme = useTheme();
  const { changeColorPalette } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("palette1");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    changeColorPalette("palette1");
    setOpen(false);
  };
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "50%",
    left: "50%",
    gap: isLandscape && (isSmall || isMedium) ? 0 : "16px",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    minWidth: "250px",
    height: "max-content",
    maxHeight: "100%",
    bgcolor: "background.paper",
    borderRadius: "50px",
    boxShadow: 24,
    p: isLandscape && (isSmall || isMedium) ? "8px" : 3,
  };
  const getProfiles = useStore((state) => state.getProfiles);
  const [profiles, setProfiles] = useState<Profile[]>([]); // Add type annotation here

  useEffect(() => {
    (async () => {
      const data = await getProfiles();
      setProfiles(data);
    })();
  }, [getProfiles]);
  const parent = useStore((state) => state.parent);
  const addProfile = useStore((state) => state.addProfile);
  const setCurrentProfile = useStore((state) => state.setCurrentProfile);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (parent) {
      const newProfile = {
        id: profiles.length,
        name: data.get("profil-name") as string,
        avatar: avatar,
        parent_id: parent.id,
        total_chapters_completed: 0,
        theme_color: color,
      };
      if (avatar) {
        addProfile(newProfile);
        // addSettings(newSettings);
        handleNavigate(newProfile);
      } else {
        setAvatar("error");
      }
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    if (!parent) {
      navigate("/login");
    }
    changeColorPalette("palette1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (profile: Profile) => {
    if (
      profile.theme_color &&
      Object.keys(colorPalettes).includes(profile.theme_color)
    ) {
      changeColorPalette(
        profile.theme_color as
          | "palette1"
          | "palette2"
          | "palette3"
          | "palette4"
          | "palette5"
      );
    }
    setCurrentProfile(profile);
    navigate("/chapters");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          padding: 0,
          mx: 0,
          height: "100%",
          width: "100%",
        }}
        maxWidth={false}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection:
              isLandscape && (isSmall || isMedium) ? "row" : "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            maxHeight: "100vh",
            maxWidth: "100vw",
            height: "100%",
            width: "100%",
            gap: isLandscape && (isSmall || isMedium) ? "0px" : "52px",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={Logo}
            className="Logo"
            alt="Logo"
            width={
              (isLandscape || isPortrait) && (isSmall || isMedium)
                ? "50px"
                : "200px"
            }
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: isLandscape && (isSmall || isMedium) ? "100%" : "100%",
              maxHeight:
                isLandscape && (isSmall || isMedium) ? "100vh" : "auto",
              gap: isLandscape && (isSmall || isMedium) ? "0px" : "24px",
            }}
          >
            <Typography
              component={"h1"}
              variant={
                (isLandscape || isPortrait) && (isSmall || isMedium)
                  ? "h5"
                  : "h3"
              }
              textAlign={"center"}
            >
              Vos profils
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "1000px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {profiles ? (
                profiles.map((profile, index) => {
                  return (
                    <Box
                      key={index}
                      className="avatar-profil-button"
                      sx={{
                        display: "flex",
                        transition: "all 0.3s",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        gap:
                          isLandscape && (isSmall || isMedium) ? "8px" : "24px",
                        padding: "8px",
                        maxWidth:
                          isLandscape && (isSmall || isMedium)
                            ? "45vw"
                            : "none",
                        flexBasis: "25%",
                        "&:hover": {
                          filter: `drop-shadow(0em 0em 1.5em ${
                            colorPalettes[
                              (profile?.theme_color ||
                                "palette1") as keyof typeof colorPalettes
                            ].primary
                          })`,
                          "& h2": {
                            color:
                              colorPalettes[
                                (profile?.theme_color ||
                                  "palette1") as keyof typeof colorPalettes
                              ].primary,
                          },
                        },
                      }}
                      onClick={() => handleNavigate(profile)}
                    >
                      <img
                        src={profile.avatar}
                        alt={profile?.name}
                        width={
                          isLandscape && (isSmall || isMedium)
                            ? "80px"
                            : "100px"
                        }
                        height={
                          isLandscape && (isSmall || isMedium)
                            ? "80px"
                            : "100px"
                        }
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      />
                      <Typography
                        component={"h2"}
                        variant={
                          (isLandscape || isPortrait) && (isSmall || isMedium)
                            ? "body1"
                            : "h5"
                        }
                        textAlign={"center"}
                        sx={{ transition: "all 0.3s" }}
                      >
                        {profile?.name}
                      </Typography>
                    </Box>
                  );
                })
              ) : (
                <CircularProgress
                  sx={{
                    mx: "auto",
                    my: "auto",
                  }}
                /> // Or replace with a spinner
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: isLandscape && (isSmall || isMedium) ? "8px" : "24px",
                  padding: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  maxWidth:
                    isLandscape && (isSmall || isMedium) ? "45vw" : "none",
                  flexBasis: "25%",
                  "&:hover svg path": {
                    fill: theme.palette.primary.main,
                  },
                  "&:hover h2": {
                    color: theme.palette.primary.main,
                  },
                }}
                className="new-profile-button"
                onClick={() => handleOpen()}
              >
                <svg
                  width={
                    isLandscape && (isSmall || isMedium) ? "60px" : "100px"
                  }
                  height={
                    isLandscape && (isSmall || isMedium) ? "60px" : "100px"
                  }
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                    fill={theme.palette.text.primary}
                    style={{ transition: "all 0.3s ease-in-out" }}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                    fill={theme.palette.text.primary}
                    style={{ transition: "all 0.3s ease-in-out" }}
                  />
                </svg>
                <Typography
                  component={"h2"}
                  variant={
                    (isLandscape || isPortrait) && (isSmall || isMedium)
                      ? "body1"
                      : "h5"
                  }
                  textAlign={"center"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  sx={{ transition: "all 0.3s ease-in-out" }}
                >
                  Ajouter un profil
                </Typography>
              </Box>
            </Box>
            <Button
              type="button"
              variant="contained"
              onClick={() => navigate("/monitoring")}
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "50px",
                padding: "6px 20px",
              }}
              color="primary"
            >
              Suivi Parent
            </Button>
          </Box>
        </Box>
        <ModalNewProfile
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          style={style}
          setAvatar={setAvatar}
          avatar={avatar}
          setColor={setColor}
          color={color}
          isMobile={isSmall || isMedium}
        />
      </Container>
    </ThemeProvider>
  );
}

export default Profiles;
