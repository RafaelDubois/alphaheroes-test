import "./Home.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Alphabet from "./assets/alphabet.jpg";
import { ThemeProvider, useTheme } from "@mui/material";
import Logo from "../Shared/assets/logos/logo_1.png";
import {
  Button,
  Grid,
  Typography,
  CssBaseline,
  Container,
  Card,
  CardMedia,
} from "@mui/material";
import ScreenContext from "../Context/components/ScreenContext";

function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Utilisation du contexte de l'écran
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);

  const items = [
    {
      src: Alphabet,
      description: "Hello World!",
    },
    {
      src: Logo,
      description: "Hello World!",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          padding: 0,
          m: "auto",
          height: "100%",
          width: "100%",
        }}
      >
        <Grid
          container
          direction={"column"}
          flexWrap={"wrap"}
          justifyContent="center"
          alignItems="center"
          style={{
            height:
              isPortrait && (isSmall || isMedium) ? "max-content" : "100%",
          }}
        >
          <Grid
            item
            xs={3}
            style={{ height: "24.99%" }}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <img
              onClick={() => navigate("/")}
              src={Logo}
              className="Logo"
              alt="Logo"
              style={{
                width:
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "100px"
                    : "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              height: "8.33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h1"
              style={{
                fontSize:
                  isLandscape && (isSmall || isMedium)
                    ? "clamp(1rem, 5vw, 1.5rem)"
                    : "clamp(1rem, 5vw, 3rem)",
              }}
            >
              Bienvenue sur Alpha Heroes
            </Typography>
          </Grid>
          <Grid
            item
            xs={isLandscape && (isSmall || isMedium) ? 3 : 4}
            style={{
              width: "100%",
              height: "41.67%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth:
                isLandscape && (isSmall || isMedium) ? "200px" : "500px",
              marginTop: isPortrait ? "10%" : 0,
            }}
          >
            <Carousel
              indicatorContainerProps={{
                style: {
                  marginTop: "0",
                  // height: "10%",
                  display: "flex",
                  justifyContent: "center",
                },
              }}
              navButtonsAlwaysVisible
              fullHeightHover={false}
              autoPlay={true}
            >
              {items.map((item, i) => (
                <Card
                  key={i}
                  sx={{
                    maxWidth: "100%",
                    height: "100%",
                    padding: "8px",
                    background: "none",
                    boxShadow: "none",
                  }}
                >
                  <CardMedia
                    sx={{
                      aspectRatio: "16/9",
                      objectFit: "contain",
                    }}
                    component="img"
                    height="100%"
                    image={item.src}
                    alt="Image"
                  />
                </Card>
              ))}
            </Carousel>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              // height: "16.67%",
              width: isPortrait ? "100%" : "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: isPortrait ? "20%" : 0,
              marginBottom: isPortrait ? "10%" : 0,
            }}
          >
            <Typography
              component="h2"
              style={{
                textAlign: "center",
                fontSize:
                  isLandscape && (isSmall || isMedium)
                    ? "clamp(1rem, 4vw, 1rem)"
                    : "clamp(1rem, 4vw, 1.5rem)",
              }}
            >
              Ici votre enfant va pouvoir apprendre l'alphabet de manière
              ludique et interactive à l'aide de leçons et d'exercices variés.
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              height: "8,33%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{
                m: 2,
                borderRadius: "24px",
                padding: "8px 24px",
                width: 250,
                fontSize: "1rem",
              }}
              color="primary"
              onClick={() => navigate("/login")}
            >
              Commencer
            </Button>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: !isPortrait && isSmall ? "center" : "flex-start",
            flexWrap: "wrap",
            maxHeight: !isPortrait && isSmall ? "100vh" : "auto",
            maxWidth: !isPortrait && isSmall ? "100vw" : "auto",
            height: "100%",
          }}
        >
          <img
            onClick={() => navigate("/")}
            src={Logo}
            className="Logo"
            alt="Logo"
            width={isSmall ? "200px" : "auto"}
          />
          <Typography
            component="h1"
            variant={isSmall ? "h5" : "h4"}
            textAlign="center"
            style={{ order: 1 }}
          >
            Bienvenue sur Alpha Heroes
          </Typography>
          <Box
            component="section"
            sx={{
              mt: 1,
              mx: isSmallScreen ? 0 : 2,
              width: !isPortrait && isMobile ? "43vw" : "80%",
              // maxWidth: "600px",
              order: !isPortrait && isMobile ? 3 : 2,
            }}
          >
            <Carousel
              navButtonsAlwaysVisible
              fullHeightHover={false}
              className="carousel"
              autoPlay={true}
            >
              {items.map((item, i) => (
                <Paper
                  style={{ padding: "8px" }}
                  square={false}
                  elevation={0}
                  key={i}
                >
                  <img className="image" width={"100%"} src={item.src} />
                </Paper>
              ))}
            </Carousel>
          </Box>
          <Box
            sx={{ order: !isPortrait && isSmall ? 2 : 3 }}
            display="flex"
            justifyContent="center"
          >
            <Button
              type="button"
              variant="contained"
              sx={{
                m: 2,
                borderRadius: "24px",
                padding: "8px 24px",
                width: 250,
                fontSize: "1rem",
              }}
              color="primary"
              onClick={() => navigate("/login")}
            >
              Commencer
            </Button>
          </Box>
        </Box> */}
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
