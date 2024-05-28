import "./Chapters.css";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ScreenContext from "../../../Context/components/ScreenContext";
import Logo from "../../../Shared/assets/logos/logo_1.png";
import { useStore, Chapter } from "../../../Users/store/store";

function Chapters() {
  const navigate = useNavigate();
  const { isSmall, isMedium, isLandscape, isPortrait } =
    useContext(ScreenContext);
  const theme = useTheme();
  const profile = useStore((state) => state.profile);
  const setCurrentProfile = useStore((state) => state.setCurrentProfile);
  const chapters = useStore((state) => state.chapters);
  const exercices = useStore((state) => state.getExercises);
  const exerciseProgress = useStore((state) => state.exerciseProgress);
  const profileExerciseProgress = exerciseProgress.filter(
    (exercise) => exercise.profile_id === profile?.id
  );

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChapterClick = (chapterId: number) => {
    navigate(`/chapters/${chapterId}/exercises`);
  };

  const handleExercises = (chapter: Chapter) => {
    const exercises = exercices(chapter.id);

    const exercicesCompleted = exercises
      .map((exercise) => {
        const exerciseCompleted = profileExerciseProgress.filter(
          (progression) =>
            progression.exercise_id === exercise.id &&
            progression.completedExercise
        )[0];
        if (exerciseCompleted) {
          return exerciseCompleted;
        }
        return;
      })
      .filter((exercise) => exercise);
    return `${exercicesCompleted.length}/${exercises.length}`;
  };

  const handleProgressBar = (chapter: Chapter) => {
    const exercises = exercices(chapter.id);
    const exercicesCompleted = exercises
      .map((exercise) => {
        const exerciseCompleted = profileExerciseProgress.filter(
          (progression) =>
            progression.exercise_id === exercise.id &&
            progression.completedExercise
        )[0];
        if (exerciseCompleted) {
          return exerciseCompleted;
        }
        return;
      })
      .filter((exercise) => exercise);
    return exercicesCompleted.length / exercises.length;
  };

  const handleBack = () => {
    setCurrentProfile(null);
    navigate("/profiles");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          sx={{
            padding: 0,
            mx: 0,
            width: "100%",
            maxWidth: "1330px",
          }}
          maxWidth={false}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection:
                (isLandscape || isPortrait) && (isSmall || isMedium)
                  ? "row"
                  : "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              maxWidth: "100vw",
              width: "100%",
              mt: "10%",
            }}
          >
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
              }}
            >
              Bienvenue {profile?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                width: "100%",
                gap:
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "16px"
                    : "52px",
                my:
                  (isLandscape || isPortrait) && (isSmall || isMedium)
                    ? "24px"
                    : "24px",
              }}
            >
              {chapters
                .sort((a, b) => a.order - b.order)
                .map((chapter, index) => (
                  <Card
                    key={index}
                    onClick={() => handleChapterClick(chapter.id)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      p:
                        (isLandscape || isPortrait) && (isSmall || isMedium)
                          ? "8px"
                          : "16px",
                      width: isPortrait ? "45%" : "30%",
                      maxWidth: "670px",
                      height: "50%",
                      borderRadius: "8px",
                      gap: "8px",
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                    className="card-parent"
                  >
                    <img
                      style={{
                        width: "100%",
                        // maxWidth: "600px",
                        borderRadius: "8px",
                        aspectRatio: "16/9",
                        objectFit: "contain",
                        background: "var(--theme-text)",
                      }}
                      src={Logo}
                    />
                    <Typography sx={{ fontWeight: "bold" }} color={"primary"}>
                      {chapter.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize:
                          (isLandscape || isPortrait) && (isMedium || isSmall)
                            ? "clamp(0.5rem, 4vw, 0.8rem)"
                            : "clamp(1rem, 4vw, 1rem)",
                        fontStyle: "italic",
                      }}
                    >
                      {chapter.description}
                    </Typography>
                    <Typography color={chapter.completed ? "primary" : "text"}>
                      {chapter.completed ? "Terminé" : "En Cours"}
                    </Typography>
                    <LinearProgress
                      sx={{
                        width: "100%",
                        height: "24px",
                        borderRadius: "4px",
                        mt: "8px",
                      }}
                      color="primary"
                      variant="determinate"
                      value={Number(handleProgressBar(chapter)) * 100}
                    ></LinearProgress>
                    <Typography
                      sx={{
                        transform: "translate(0px, -32px)",
                        height: "0px",
                        textAlign: "left",
                        width: "95%",
                      }}
                    >
                      {handleExercises(chapter)}
                    </Typography>
                  </Card>
                ))}
            </Box>
          </Box>
        </Container>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default Chapters;
