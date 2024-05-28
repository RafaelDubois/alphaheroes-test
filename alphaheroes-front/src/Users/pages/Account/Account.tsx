import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Shared/assets/logos/logo_1.png";
import { useContext, useState } from "react";
import ScreenContext from "../../../Context/components/ScreenContext";
import { useStore } from "../../store/store";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function Account() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);
  const parent = useStore((state) => state.parent);
  const [newsLetter, setNewsLetter] = useState(false);
  const [authorization, setAuthorization] = useState(false);
  const [modify, setModify] = useState(false);
  const [email, handleEmail] = useState("");
  const [password, handlePassword] = useState("");

  console.log(parent);

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            flexWrap: "wrap",
            maxHeight: "100vh",
            maxWidth: "100vw",
            width: "100%",
          }}
        >
          <Typography
            component={"h1"}
            variant={
              (isLandscape || isPortrait) && (isSmall || isMedium) ? "h4" : "h3"
            }
            textAlign={"center"}
            width={"100%"}
            mt={(isLandscape || isPortrait) && isMedium ? 0 : "10%"}
          >
            Mes informations
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "32px",
              mt:
                (isLandscape || isPortrait) && (isSmall || isMedium)
                  ? "10%"
                  : "5%",
              width: "100%",
              maxWidth: "1300px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
              >
                Prénom :
              </Typography>
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
                color={"primary"}
              >
                {parent?.firstName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
              >
                Nom :
              </Typography>
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
                color={"primary"}
              >
                {parent?.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
              >
                E-mail :
              </Typography>
              <TextField
                required
                id="email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "8px 16px",
                  },
                  width: "50%",
                }}
                disabled={!modify}
                name="email"
                placeholder={parent?.email}
                type="email"
                value={email}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => handleEmail(event.target.value)}
              />
              {modify ? (
                <Button
                  sx={{
                    padding: "8px 16px",
                    background: "#333",
                    color: "var(--theme-text)",
                  }}
                  onClick={() => {
                    setModify(false);
                    handleEmail("");
                    handlePassword("");
                  }}
                >
                  Annuler
                </Button>
              ) : (
                <Button
                  sx={{
                    padding: "8px 16px",
                    background: "var(--theme-color)",
                    color: "var(--theme-text)",
                  }}
                  onClick={() => setModify(true)}
                >
                  Modifier
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                gap: "8px",
              }}
            >
              <Typography
                component={"h2"}
                variant={
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "h6"
                    : "h5"
                }
                textAlign={"center"}
              >
                Mot de passe :
              </Typography>
              {modify ? (
                <Box sx={{ width: "60%" }}>
                  <TextField
                    required
                    id="password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                      "& .MuiInputBase-input": {
                        padding: "8px 16px",
                      },
                      width: "100%",
                    }}
                    disabled={!modify}
                    name="password"
                    type="password"
                    color="error"
                    focused
                    value={password}
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => handlePassword(event.target.value)}
                  />
                  <Typography
                    sx={{
                      m: "8px 0 0 0",
                      fontSize:
                        (isLandscape || isPortrait) && (isSmall || isMedium)
                          ? "clamp(0.8rem, 4vw, 0.8rem)"
                          : "clamp(1rem, 4vw, 1rem)",
                      lineHeight: "16px",
                      width: "100%",
                    }}
                  >
                    Veuillez saisir le mot de passe pour changer de mail
                  </Typography>
                </Box>
              ) : (
                <Button
                  sx={{
                    padding: "8px 16px",
                    background: "var(--theme-color)",
                    color: "var(--theme-text)",
                  }}
                >
                  Réinitialiser
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "16px",
              }}
            >
              <List component="em">
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setNewsLetter(!newsLetter)}
                    dense
                  >
                    <ListItemIcon>
                      {newsLetter ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "var(--theme-text)",
                        opacity: newsLetter ? 1 : 0.5,
                        textDecoration: "none",
                      }}
                      primary={
                        "Je souhaite recevoir les actualités et offres d’Alpha Heroes"
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setAuthorization(!authorization)}
                    dense
                  >
                    <ListItemIcon>
                      {authorization ? (
                        <RadioButtonCheckedIcon />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "var(--theme-text)",
                        opacity: authorization ? 1 : 0.5,
                        textDecoration: "none",
                      }}
                      primary={
                        "En tant qu’autorité de l’enfant, j’accepte que l’enfant utilise le service lié au présent contrat conformément aux conditions générales d’utilisation.*"
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                gap: "16px",
              }}
            >
              <Button
                sx={{
                  padding: "8px 32px",
                  background: "var(--theme-color)",
                  color: "var(--theme-text)",
                }}
                onClick={() => console.log("test")}
              >
                Envoyer
              </Button>
            </Box>
            <Typography
              onClick={() => console.log("test")}
              sx={{
                textDecoration: "none",
                color: "var(--theme-color)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              Suppression de compte ?
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Account;
