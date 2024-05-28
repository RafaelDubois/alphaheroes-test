import { useStore } from "../../../Users/store/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Tooltip from "@mui/material/Tooltip";

function Exercises() {
  const theme = useTheme();
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const exercises = useStore((state) =>
    state.getExercises(chapterId ? parseInt(chapterId) : 0)
  );

  const handleBack = () => {
    navigate("/chapters");
  };

  return (
    <>
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
            className="Exercises"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              maxHeight: "100vh",
              maxWidth: "100vw",
              height: "100%",
              width: "100%",
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
                gap: "35%",
              }}
            >
              <svg
                fill={theme.palette.text.primary}
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleBack()}
                style={{ cursor: "pointer" }}
              >
                <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
              </svg>
            </Box>
            <Typography
              component={"h1"}
              variant={"h3"}
              sx={{
                width: "100%",
                textAlign: "center",
                mt: "10%",
              }}
            >
              Chapitre n°{chapterId}
            </Typography>

            <Typography
              component={"h2"}
              variant={"h4"}
              sx={{
                width: "100%",
                textAlign: "center",
                mt: "10%",
              }}
            >
              Exercices
            </Typography>
            <Box
              sx={{
                margin: "5%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                mt: "10%",
              }}
            >
              {exercises && exercises.length > 0 ? (
                exercises
                  .sort((a, b) => a.id - b.id)
                  .map((exercise, index, array) => {
                    let disabled = true;
                    let tooltipText = "Exercice précédent non terminé";
                    if (index === 0 || array[index - 1].completed) {
                      disabled = false;
                      tooltipText = exercise.completed
                        ? "Félicitation, exercice terminé"
                        : "Exercice actif";
                    }
                    return (
                      <Tooltip key={index} title={tooltipText} arrow>
                        <span>
                          <Button
                            onClick={() => console.log("test")}
                            variant="contained"
                            color="primary"
                            endIcon={
                              exercise.completed ? (
                                <StarIcon style={{ fontSize: 30 }} />
                              ) : null
                            }
                            disabled={disabled}
                            sx={{
                              width: "210px",
                              height: "50px",
                              fontSize: "1.2em",
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            Exercice n°{index + 1}
                          </Button>
                        </span>
                      </Tooltip>
                    );
                  })
              ) : (
                <p>Aucun exercice n'est disponible pour ce chapitre</p>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Exercises;
