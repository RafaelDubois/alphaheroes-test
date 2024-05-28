import "./Monitoring.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Fade,
  Modal,
  Backdrop,
  // TextField,
  // Select,
  FormControl,
  // InputLabel,
  Button,
  Card,
  // MenuItem,
  NativeSelect,
} from "@mui/material";
import Logo from "../../../Shared/assets/logos/logo_1.png";
// import Alien from "../../assets/avatars/alien_boy_avatar.png";
// import Aquaboy from "../../assets/avatars/Aquaboy_avatar.png";
// import Captain from "../../assets/avatars/Captain_America_Avatar.png";
// import Egyptian from "../../assets/avatars/Egyptian_boy_avatar.png";
// import Aquagirl from "../../assets/avatars/Aquagirl_avatar.png";
// import Batboy from "../../assets/avatars/Batboy_avatar.png";
// import Batgirl from "../../assets/avatars/Batgirl_avatar.png";
// import Dino from "../../assets/avatars/dino_hero_avatar.png";
import { useContext, useEffect, useRef, useState } from "react";
import ScreenContext from "../../../Context/components/ScreenContext";
import { Profile, useStore } from "../../store/store";
import { colorPalettes } from "../../../Context/components/ColorPalettes";

function Monitoring() {
  const elementRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);
  const [open, setOpen] = useState(false);
  // const [avatar, setAvatar] = useState("");
  const [maxLeft, setMaxLeft] = useState(true);
  const [maxRight, setMaxRight] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedProfile, setSelectedProfile] = useState({
    id: 0,
    name: "",
    image: "",
    parent_id: 0,
  });
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    top: "50%",
    left: "50%",
    gap: (isLandscape || isPortrait) && (isSmall || isMedium) ? 0 : "16px",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "600px",
    minWidth: "250px",
    // height: "max-content",
    // maxHeight: "100%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };
  const [profiles, setProfiles] = useState(
    useStore((state) => state.getProfiles())
  );
  const deleteProfile = useStore((state) => state.deleteProfile);
  const settings = useStore((state) => state.settings);
  const modifySettings = useStore((state) => state.modifySettings);
  const setCurrentProfile = useStore((state) => state.setCurrentProfile);

  const handleOpen = (index: number) => {
    // setAvatar(profiles[index].image);
    setSelectedProfile(profiles[index]);
    console.log(selectedProfile);
    setOpen(true);
  };

  useEffect(() => {
    console.log(selectedProfile);
  }, [selectedProfile]);

  useEffect(() => {
    if (!profiles.length) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const profileToSend = {
    //   id: selectedProfile.id,
    //   name: selectedProfile.name,
    //   image: selectedProfile.image,
    //   time: Number(data.get("hours")),
    //   exercices: Number(data.get("exercices")),
    // };
    const settingsToSend = {
      id: settings.filter(
        (setting) => setting.profile_id === selectedProfile.id
      )[0].id,
      maxExercisesPerDay: Number(data.get("exercices")),
      maxTimePerDay: Number(data.get("hours")),
      profile_id: selectedProfile.id,
    };
    console.log(settingsToSend);
    const newSettings = settings.map((setting) =>
      setting.profile_id === selectedProfile.id ? settingsToSend : setting
    );
    console.log("newSezttings : ", newSettings);
    modifySettings(newSettings);
    console.log(event);
    handleClose();
  };

  const handleDelete = () => {
    const newProfiles = profiles.filter(
      (_profile, index) => index !== selectedProfile.id
    );
    setProfiles(newProfiles);
    deleteProfile(selectedProfile.id);
    handleClose();
  };

  useEffect(() => {
    if (profiles.length <= 3) {
      setMaxLeft(true);
      setMaxRight(true);
    }
  }, [profiles]);

  const handleScroll = (step: number, distance: number, speed: number) => {
    let scrollAmount = 0;
    if (!elementRef.current) {
      return;
    }
    const slideTimer = setInterval(() => {
      elementRef.current?.scrollTo({
        left: elementRef.current.scrollLeft + step,
        behavior: "smooth",
      });
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const handleHideButtons = () => {
    if (!elementRef.current) {
      return;
    }
    if (elementRef.current?.scrollLeft === 0) {
      setMaxLeft(true);
    } else if (maxLeft === true) {
      setMaxLeft(false);
    }
    if (
      elementRef.current.scrollLeft + elementRef.current.clientWidth ===
        elementRef.current.scrollWidth ||
      profiles.length <= 3
    ) {
      setMaxRight(true);
    } else if (maxRight === true) {
      setMaxRight(false);
    }
  };

  // url avec id et nom
  const handleFollowUserClick = (profile: Profile) => {
    setCurrentProfile(profile)
    navigate(`/monitoring/${profile.name}`);
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
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            maxHeight: "100vh",
            maxWidth: "100vw",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={Logo}
            className="Logo-end"
            alt="Logo"
            width={
              (isLandscape || isPortrait) && (isSmall || isMedium)
                ? "50px"
                : "200px"
            }
            style={{ position: "absolute" }}
          />
          <Typography
            component={"h1"}
            variant={
              (isLandscape || isPortrait) && (isSmall || isMedium) ? "h4" : "h3"
            }
            textAlign={"center"}
            width={"100%"}
            mt={(isLandscape || isPortrait) && isMedium ? 0 : "10%"}
          >
            Suivi parents
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              mt:
                (isLandscape || isPortrait) && (isSmall || isMedium)
                  ? "0%"
                  : "0%",
              gap:
                (isLandscape || isPortrait) && (isSmall || isMedium)
                  ? "16px"
                  : "32px",
              p: "8px",
              width: "100%",
              maxHeight: "100%",
              overflow: "auto",
              scroll: "smooth",
            }}
            className="scroller"
            ref={elementRef}
            onScroll={() => handleHideButtons()}
          >
            {((isLandscape || isPortrait) && (isSmall || isMedium)) ?? (
              <Box
                sx={{
                  position: "absolute",
                  left: "0px",
                  transform: "translate(0%, 300px)",
                }}
              >
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleScroll(-10, 200, 10)}
                  display={maxLeft ? "none" : "block"}
                >
                  <path
                    d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
                    fill={theme.palette.text.primary}
                  />
                </svg>
              </Box>
            )}
            {profiles.map((profile, index) => (
              <Card
                key={index}
                className="card-monitoring-profil"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  p: "8px",
                  width: isPortrait ? "100%" : "25%",
                  height: "100%",
                  gap:
                    (isLandscape || isPortrait) && (isSmall || isMedium)
                      ? "4px"
                      : "80px",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": {
                    filter: `drop-shadow(0 0 0.5em ${
                      colorPalettes[
                        profile.theme_color as keyof typeof colorPalettes
                      ].primary
                    })`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{ flexBasis: "100%" }}
                    textAlign={"center"}
                    variant={
                      (isLandscape || isPortrait) && (isSmall || isMedium)
                        ? "h6"
                        : "h3"
                    }
                  >
                    {profile.name}
                  </Typography>
                  <svg
                    width={
                      (isLandscape || isPortrait) && (isSmall || isMedium)
                        ? "20px"
                        : "40px"
                    }
                    height={
                      (isLandscape || isPortrait) && (isSmall || isMedium)
                        ? "20px"
                        : "40px"
                    }
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                    onClick={() => handleOpen(index)}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke={
                        theme.palette.mode === "dark" ? "#fff" : "#121212"
                      }
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                      stroke={
                        theme.palette.mode === "dark" ? "#fff" : "#121212"
                      }
                      className="settings-button"
                      strokeWidth="1.5"
                    />
                  </svg>
                </Box>
                <img
                  width={
                    (isLandscape || isPortrait) && (isSmall || isMedium)
                      ? "40%"
                      : "50%"
                  }
                  style={{
                    maxWidth: "150px",
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                  alt={profile.name}
                  src={profile.image}
                />
                <Typography
                  component={"h1"}
                  variant="h5"
                  sx={{
                    fontSize:
                      (isLandscape || isPortrait) && isMedium
                        ? "clamp(0.5rem, 4vw, 0.6rem)"
                        : "clamp(1rem, 4vw, 1.5rem)",
                  }}
                >{`Temps de jeu journalier : ${
                  settings.filter(
                    (setting) => setting.profile_id === profile.id
                  )[0].maxTimePerDay == Infinity
                    ? "∞"
                    : settings.filter(
                        (setting) => setting.profile_id === profile.id
                      )[0].maxTimePerDay + "h"
                }`}</Typography>
                <Typography
                  component={"h1"}
                  variant="h5"
                  sx={{
                    fontSize:
                      (isLandscape || isPortrait) && isMedium
                        ? "clamp(0.5rem, 4vw, 0.6rem)"
                        : "clamp(1rem, 4vw, 1.5rem)",
                  }}
                >{`Nombre d'exercices max journalier : ${
                  settings.filter(
                    (setting) => setting.profile_id === profile.id
                  )[0].maxExercisesPerDay == Infinity
                    ? "∞"
                    : settings.filter(
                        (setting) => setting.profile_id === profile.id
                      )[0].maxExercisesPerDay
                }`}</Typography>
                <Button
                  type="button"
                  onClick={() =>
                    handleFollowUserClick(profile)
                  }
                  variant="contained"
                  sx={{
                    mt:
                      (isLandscape || isPortrait) && (isSmall || isMedium)
                        ? 3
                        : 0,
                    mb: 2,
                    borderRadius: "50px",
                    padding:
                      (isLandscape || isPortrait) && isMedium
                        ? "4px 12px"
                        : "8px 24px",
                    fontSize:
                      (isLandscape || isPortrait) && isMedium
                        ? "clamp(0.5rem, 4vw, 0.6rem)"
                        : "clamp(1rem, 4vw, 1rem)",
                  }}
                  color="primary"
                >
                  Suivi
                </Button>
              </Card>
            ))}
            {((isLandscape || isPortrait) && (isSmall || isMedium)) ?? (
              <Box
                sx={{
                  position: "absolute",
                  right: "0px",
                  transform: "translate(0%, 300px)",
                }}
              >
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 1024 1024"
                  className="icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleScroll(10, 200, 10)}
                  display={maxRight ? "none" : "block"}
                >
                  <path
                    d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                    fill={theme.palette.text.primary}
                  />
                </svg>
              </Box>
            )}
          </Box>
        </Box>
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
            <Box component="form" onSubmit={handleSubmit} sx={style}>
              <Typography
                component={"h1"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "subtitle1"
                    : "h4"
                }
                textAlign={"center"}
              >
                Réglages
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  gap: "16px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Typography component={"h1"} variant="body1">
                    Limite de temps par jour :
                  </Typography>
                  <FormControl sx={{ width: "20%" }}>
                    <NativeSelect
                      id="demo-simple-select"
                      defaultValue={
                        settings.filter(
                          (setting) => setting.profile_id === selectedProfile.id
                        )[0].maxTimePerDay
                      }
                      inputProps={{
                        name: "hours",
                        id: "hours",
                      }}
                    >
                      <option value={1}>1h</option>
                      <option value={2}>2h</option>
                      <option value={3}>3h</option>
                      <option value={4}>4h</option>
                      <option value={Infinity}>Illimité</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Typography component={"h1"} variant="body1">
                    Limite d’exercices par jour :
                  </Typography>

                  <FormControl sx={{ width: "20%" }}>
                    <NativeSelect
                      id="demo-simple-select"
                      defaultValue={
                        settings.filter(
                          (setting) => setting.profile_id === selectedProfile.id
                        )[0].maxExercisesPerDay
                      }
                      inputProps={{
                        name: "exercices",
                        id: "exercices",
                      }}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={Infinity}>Illimité</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent={isPortrait ? "center" : "space-between"}
                flexWrap={"wrap"}
              >
                <Box
                  sx={{
                    gap: "16px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: isPortrait ? 0 : 2,
                      borderRadius: "20px",
                      padding: "8px 24px",
                    }}
                    color="primary"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => handleDelete()}
                    sx={{
                      mt: 3,
                      mb: isPortrait ? 0 : 2,
                      borderRadius: "20px",
                      padding: "8px 24px",
                    }}
                    color="primary"
                  >
                    Suppression
                  </Button>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: isPortrait ? 0 : 2,
                    borderRadius: "20px",
                    padding: "8px 24px",
                  }}
                  color="primary"
                >
                  Appliquer
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default Monitoring;
