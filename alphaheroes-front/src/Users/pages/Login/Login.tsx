import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "../../../Shared/assets/logos/logo_1.png";
import { useNavigate } from "react-router-dom";
import MailInputForm from "../../components/mailInputForm";
import ScreenContext from "../../../Context/components/ScreenContext";
import { useTheme } from "@emotion/react";
import { useStore } from "../../store/store";
import { TextField } from "@mui/material";

function LoginPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Utilisation du contexte de l'écran
  const { isSmall, isMedium, isLarge, isXLarge, isPortrait, isLandscape } =
    useContext(ScreenContext);

  // Création d'un état pour l'adresse e-mail
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const currentParent = useStore((state) => state.parent);
  const parents = useStore((state) => state.parents);
  const getParent = useStore((state) => state.getParent);
  const setCurrentParent = useStore((state) => state.setCurrentParent);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (currentParent) {
      setCurrentParent(currentParent);
      navigate("/profiles");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent default form submission
  
    const form = event.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
  
    // Get your store from context
  
    try {
      // Call getParent from your store
      const parent = await getParent(email, password);
      console.log(parent);
      setCurrentParent(parent);
      navigate("/profiles");
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const form = event.currentTarget as HTMLFormElement;
  //   const email = (form.elements.namedItem('email') as HTMLInputElement).value;
  //   const password = (form.elements.namedItem('password') as HTMLInputElement).value;
  
  //   console.log(email, password);
  //   console.log('Submitting')
  //   try {
  //     console.log("Submitting");
  //     const response = await axios.post(
  //       "http://localhost:3000/api/auth/login",
  //       {
  //         email,
  //         password,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log("Change");

  //     // Handle response here. For example:
  //     console.log(response.data);
  //     console.log("Testin token");
  //     const token = response.data.token;
  //     const res = await fetch("http://localhost:3000/api/profiles", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Si l'écran est en mode portrait et isSmall, ne rien afficher
  if (isSmall && isPortrait) {
    return null;
  }

  // Rendu du composant
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth={isLandscape && (isSmall || isMedium) ? "xs" : "sm"}
        sx={{
          height: "100%",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100vw",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={Logo}
            alt="Logo"
            style={{
              position:
                isLandscape && (isSmall || isMedium) ? "absolute" : "static",
              top: isLandscape && (isSmall || isMedium) ? "0px" : "auto",
              left: isLandscape && (isSmall || isMedium) ? "10px" : "auto",
            }}
            width={
              isSmall && isLandscape
                ? "150px"
                : isSmall && isPortrait
                ? "200px"
                : isMedium && isPortrait
                ? "150px"
                : isMedium && isLandscape
                ? "150px"
                : isLarge && isPortrait
                ? "400px"
                : isLarge && isLandscape
                ? "400px"
                : isXLarge && isPortrait
                ? "250px"
                : isXLarge && isLandscape
                ? "500px"
                : "auto"
            }
          />
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{
              mt: isLandscape ? "10px" : "0px",
            }}
          >
            Connectez-vous pour démarrer
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: "70%",
            }}
          >
            {/* Champs du formulaire */}
            <MailInputForm onChange={setEmail} />
            {error && (
              <Typography color="error">
                Email ou mot de passe incorrect
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
                "& .MuiInputBase-input": {
                  textAlign: "center",
                  padding: "8px 14px",
                },
                "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
                  transform: "translate(14px, 10px) scale(1)",
                },
              }}
              label="Mot de passe"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              value={password}
              onChange={handlePasswordChange}
            />
            {/* Bouton de connexion */}
            <Box
              display="flex"
              alignItems="center"
              gap={"8px"}
              flexDirection={"column"}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: isLandscape && (isSmall || isMedium) ? 1 : 2,
                  mb: isLandscape && (isSmall || isMedium) ? 1 : 2,
                  borderRadius: "50px",
                  padding: "6px 20px",
                }}
                color="primary"
              >
                Connexion
              </Button>
              <Link sx={{ mb: 2 }} href="#" variant="body2">
                Mot de passe oublié ?
              </Link>
            </Box>
            {/* Liens pour la récupération du mot de passe et l'inscription */}

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              style={{
                position:
                  isLandscape && (isSmall || isMedium) ? "absolute" : "static",
                bottom: isLandscape && (isSmall || isMedium) ? "30px" : "auto",
                left: isLandscape && (isSmall || isMedium) ? "20px" : "auto",
                marginTop: isLandscape && (isSmall || isMedium) ? "0" : "10%",
              }}
            >
              <Typography color="primary">{"Pas de compte ? "}</Typography>
              <Button
                variant="outlined"
                sx={{
                  mt: 1,
                  borderRadius: "50px",
                  padding: "6px 20px",
                }}
                color="primary"
                component={RouterLink}
                to="/register"
              >
                Je m'inscris
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// Exportation du composant Login
export default LoginPage;
