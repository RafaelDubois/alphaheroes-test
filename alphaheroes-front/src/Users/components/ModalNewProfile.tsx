import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  SxProps,
  Theme,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useContext } from "react";
import ThemeContext from "../../Context/components/ThemeContext";
import { colorPalettes } from "../../Context/components/ColorPalettes";
import Alien from "../assets/avatars/alien_boy_avatar.png";
import Aquaboy from "../assets/avatars/Aquaboy_avatar.png";
import Captain from "../assets/avatars/Captain_America_Avatar.png";
import Egyptian from "../assets/avatars/Egyptian_boy_avatar.png";
import Aquagirl from "../assets/avatars/Aquagirl_avatar.png";
import Batboy from "../assets/avatars/Batboy_avatar.png";
import Batgirl from "../assets/avatars/Batgirl_avatar.png";
import Dino from "../assets/avatars/dino_hero_avatar.png";

interface ModalNewProfileProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Modifié ici
  style: SxProps<Theme>;
  setAvatar: (image: string) => void;
  avatar: string;
  setColor: (color: string) => void;
  color: string;
  isMobile: boolean;
}

function ModalNewProfile({
  open,
  handleClose,
  handleSubmit,
  style,
  setAvatar,
  avatar,
  setColor,
  color,
  isMobile,
}: ModalNewProfileProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { changeColorPalette } = useContext(ThemeContext);

  // console.log(Object.entries(colorPalettes));

  const handleScroll = (direction: number) => {
    if (scrollRef.current) {
      const avatarNode = scrollRef.current.children[0] as HTMLElement;
      const avatarWidth = avatarNode.offsetWidth;
      const gap = parseInt(window.getComputedStyle(scrollRef.current).gap, 10);
      scrollRef.current.scrollLeft += direction * (avatarWidth + gap);
    }
  };

  // console.log(scrollRef.current);

  const images = [
    Alien,
    Aquaboy,
    Captain,
    Egyptian,
    Aquagirl,
    Batboy,
    Batgirl,
    Dino,
  ];

  // Gérer le changement de palette de couleurs
  const handleColorChange = (palette: string) => {
    setColor(palette);
    // console.log(color);
    changeColorPalette(palette as keyof typeof colorPalettes);
  };

  return (
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
            variant={isMobile ? "subtitle1" : "h4"}
            textAlign={"center"}
          >
            Choisissez un avatar
          </Typography>
          {avatar === "error" ? (
            <Typography
              component={"h1"}
              variant={isMobile ? "subtitle1" : "h4"}
              fontStyle={"italic"}
              textAlign={"center"}
              color={"error"}
            >
              Vous n'avez pas choisi d'avatar
            </Typography>
          ) : null}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <IconButton
              sx={{ display: isMobile ? "none" : "block" }}
              onClick={() => handleScroll(-1)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Box
              ref={scrollRef}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                overflowX: "auto", // Maintient la capacité de défilement
                scrollBehavior: "smooth",
                gap: 5,
                padding: "0 24px",
                height: "150px",
                width: "100%",
                "&::-webkit-scrollbar": {
                  display: "none", // Cache la barre de défilement pour les navigateurs Webkit (Chrome, Safari)
                },
                scrollbarWidth: "none", // Pour Firefox
                msOverflowStyle: "none", // Pour Internet Explorer et Edge
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  className="avatar-image-modal"
                  sx={{
                    display: "flex",
                    transition: "all 0.3s",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    filter:
                      avatar === image
                        ? "drop-shadow(0 0 0.5em var(--theme-text))"
                        : "none",
                  }}
                  onClick={() => setAvatar(image)}
                >
                  <img
                    src={image}
                    alt={`${index}`}
                    width={"100px"}
                    height={"100px"}
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Box>
            <IconButton
              sx={{ display: isMobile ? "none" : "block" }}
              onClick={() => handleScroll(1)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          {/* Sélecteur de couleur du thème */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "8px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {Object.entries(colorPalettes).map((palette, index) => (
              <Box
                key={index}
                onClick={() => handleColorChange(palette[0])}
                sx={{
                  background: palette[1].primary,
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border:
                    color === palette[0]
                      ? "2px solid var(--theme-text)"
                      : "none",
                }}
              ></Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: isMobile ? "8px" : "24px",
            }}
          >
            <Typography
              component={"h1"}
              variant={isMobile ? "body2" : "h4"}
              textAlign={"center"}
            >
              Entrez votre nom de super héros
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="profile-name"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
                "& .MuiInputLabel-root": {
                  textAlign: "center", // centre le label
                },
                "& .MuiInputBase-input": {
                  textAlign: "center", // centre le texte
                },
                maxWidth: "500px",
              }}
              label="Nom de super héros"
              name="profil-name"
            />
          </Box>

          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: "50px",
                padding: "8px 24px",
              }}
              color="primary"
            >
              Créer le profil
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalNewProfile;
