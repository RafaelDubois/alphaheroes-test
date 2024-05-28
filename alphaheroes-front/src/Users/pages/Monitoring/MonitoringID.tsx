import {
  Box,
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ScreenContext from "../../../Context/components/ScreenContext";
import { useContext } from "react";
import Logo from "../../../Shared/assets/logos/logo_1.png";

function MonitoringID() {
  const theme = useTheme();
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);
  const navigate = useNavigate();
  const profile = useStore((state) => state.profile);
  const chapters = useStore((state) => state.chapters);
  const exercises = useStore((state) => state.exercises);
  const exerciseProgress = useStore((state) => state.exerciseProgress);
  const profileExerciseProgress = exerciseProgress.filter(
    (exercise) => exercise.profile_id === profile?.id
  );

  console.log(profileExerciseProgress);

  const handleBack = () => {
    navigate("/monitoring");
  };

  if (!profile) {
    navigate("/monitoring");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        sx={{
          padding: 0,
          mx: 0,
          width: "100%",
        }}
        maxWidth={false}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "max-content",
            pr: "30px",
            gap: isSmall ? "0px" : "35%",
          }}
        >
          <svg
            fill={theme.palette.text.primary}
            width="48px"
            height="48px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleBack()}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "8px",
              left: "8px",
            }}
          >
            <path
              d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
              fill=""
            />
          </svg>
        </Box>
        <Typography
          component={"h1"}
          variant={"h3"}
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize:
              (isLandscape || isPortrait) && (isMedium || isSmall)
                ? "clamp(2rem, 4vw, 2rem)"
                : "clamp(3rem, 4vw, 3rem)",
            mt: "0px",
            mb: "5%",
          }}
        >
          Suivi de {profile?.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection:
              (isLandscape || isPortrait) && (isMedium || isSmall)
                ? "column"
                : "row",
            flexWrap: "wrap",
            width: "100%",
            gap: "8px",
          }}
        >
          {chapters.map((chapter) => (
            <Box
              sx={{
                width:
                  (isLandscape || isPortrait) && (isMedium || isSmall)
                    ? "100%"
                    : "45%",
                // background: "var(--theme-color)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "8px",
                borderRadius: "8px",
              }}
            >
              <Typography
                component={"h2"}
                variant={"h3"}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontSize:
                    (isLandscape || isPortrait) && (isMedium || isSmall)
                      ? "clamp(1rem, 4vw, 1rem)"
                      : "clamp(2rem, 4vw, 1.5rem)",
                  mt: "0px",
                  mb: "16px",
                }}
              >
                {chapter.name}
              </Typography>
              <img
                style={{
                  width:
                    (isLandscape || isPortrait) && (isMedium || isSmall)
                      ? "80px"
                      : "150px",
                }}
                src={Logo}
              />
              <Box
                sx={{
                  display: "flex",
                  gap:
                    (isLandscape || isPortrait) && (isMedium || isSmall)
                      ? "8px"
                      : "16px",
                  p: "8px",
                  justifyContent:
                    isPortrait && (isMedium || isSmall)
                      ? "flex-start"
                      : "center",
                }}
              >
                {exercises
                  .filter((exercise) => exercise.chapter_id === chapter.id)
                  .map((exercise, index) => {
                    const exerciseProgression = profileExerciseProgress.find(
                      (progression) => progression.exercise_id === exercise.id
                    );
                    return (
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "8px",
                          borderRadius: "8px",
                          flexBasis:"20%",
                          opacity: exerciseProgression?.completedExercise
                            ? 1
                            : 0.5,
                        }}
                      >
                        <Typography
                          component={"h3"}
                          variant={"h6"}
                          sx={{
                            width: "100%",
                            textAlign: "center",
                            fontSize:
                              (isLandscape || isPortrait) &&
                              (isMedium || isSmall)
                                ? "clamp(0.8rem, 4vw, 0.8rem)"
                                : "clamp(1rem, 4vw, 1rem)",
                            mt: "0px",
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <svg
                          height="30px"
                          width="30px"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 501.333 501.333"
                          xmlSpace="preserve"
                        >
                          <polygon
                            fill={
                              exerciseProgression?.completedExercise
                                ? "#E14A4A"
                                : "#333"
                            }
                            points="501.333,407.467 405.333,402.133 384,501.333 229.333,306.133 346.667,212.267 "
                          />
                          <polygon
                            fill={
                              exerciseProgression?.completedExercise
                                ? "#F16D6E"
                                : "#333"
                            }
                            points="0,407.467 96,402.133 117.333,501.333 272,306.133 154.667,212.267 "
                          />
                          <polygon
                            fill={
                              exerciseProgression?.completedExercise
                                ? "#53C2EF"
                                : "#333"
                            }
                            points="250.667,25.6 288,0 311.467,38.4 355.2,29.867 360.533,74.667 405.333,85.333 
	391.467,129.067 427.733,155.733 397.867,189.867 420.267,229.333 378.667,248.533 382.933,293.333 338.133,294.4 323.2,337.067 
	281.6,320 250.667,353.067 219.733,320 178.133,337.067 163.2,294.4 118.4,293.333 122.667,248.533 81.067,229.333 103.467,189.867 
	73.6,155.733 109.867,129.067 96,85.333 140.8,74.667 146.133,29.867 189.867,38.4 213.333,0 "
                          />
                          <ellipse
                            fill={
                              exerciseProgression?.completedExercise
                                ? "#FEC656"
                                : "#333"
                            }
                            cx="250.667"
                            cy="176"
                            rx="105.6"
                            ry="105.6"
                          />
                        </svg>
                      </Paper>
                    );
                  })}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default MonitoringID;
