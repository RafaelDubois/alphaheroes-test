import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  Button,
  Link,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ScreenContext from "../../../Context/components/ScreenContext";
import Logo from "../../../Shared/assets/logos/logo_1.png";
import MailInputForm from "../../components/mailInputForm";
import PasswordInputForm from "../../components/passwordInputForm";
import IdentityInputForm from "../../components/IdentityInputForm";
import { useStore } from "../../store/store";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

function RegisterPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isSmall, isMedium, isLandscape } = useContext(ScreenContext);

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validation logic

    // FirstName
    if (!formValues.firstName) {
      isValid = false;
      errors["firstName"] = "Le prénom est requis";
    } else if (
      formValues.firstName.length < 2 ||
      !/^[a-zA-ZÀ-ÿ\s-]*$/.test(formValues.firstName)
    ) {
      isValid = false;
      errors["firstName"] =
        "Le prénom doit contenir au moins 2 caractères et ne peut contenir que des lettres, des espaces et des tirets";
    }

    // LastName
    if (!formValues.lastName) {
      isValid = false;
      errors["lastName"] = "Le nom est requis";
    } else if (
      formValues.lastName.length < 2 ||
      !/^[a-zA-ZÀ-ÿ\s-]*$/.test(formValues.lastName)
    ) {
      isValid = false;
      errors["lastName"] =
        "Le nom doit contenir au moins 2 caractères et ne peut contenir que des lettres, des espaces et des tirets";
    }

    // Email
    if (!formValues.email) {
      isValid = false;
      errors["email"] = "L'adresse mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      isValid = false;
      errors["email"] = "L'adresse mail est invalide";
    }

    // Password
    if (!formValues.password) {
      isValid = false;
      errors["password"] = "Le mot de passe est requis";
    } else if (
      formValues.password.length < 8 ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(
        formValues.password
      )
    ) {
      isValid = false;
      errors["password"] =
        "Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (parmi !@#$%^&*)";
    }

    // Confirm Password
    if (formValues.password !== formValues.confirmPassword) {
      isValid = false;
      errors["confirmPassword"] = "Les mots de passe ne correspondent pas";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      const newParent = {
        id: Math.random(), // Un identifiant unique, idéalement un UUID ou similaire
        name: formValues.lastName, // ou une combinaison prénom + nom
        firstName: formValues.firstName,
        email: formValues.email,
        password: formValues.password,
      };

      // Appeler la méthode addParent de votre store
      useStore.getState().addParent(newParent);

      // Rediriger l'utilisateur vers un autre chemin, par exemple le profil
      navigate("/profiles");
    }
  };

  const handleChange = (field: keyof FormValues) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));

    // Clear the specific field error as the user types
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth={isLandscape && (isSmall || isMedium) ? "xs" : "sm"}
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
            width={isSmall && isLandscape ? "150px" : "200px"}
          />
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{ mt: isLandscape ? "10px" : "0px" }}
          >
            Création de compte
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "70%" }}
          >
            <IdentityInputForm
              label="Prénom"
              onChange={handleChange("firstName")}
              defaultValue={formValues.firstName}
            />
            <Typography color="error">{formErrors.firstName}</Typography>
            <IdentityInputForm
              label="Nom"
              onChange={handleChange("lastName")}
              defaultValue={formValues.lastName}
            />
            <Typography color="error">{formErrors.lastName}</Typography>
            <MailInputForm
              onChange={handleChange("email")}
              defaultValue={formValues.email}
            />
            <Typography color="error">{formErrors.email}</Typography>
            <PasswordInputForm
              onChangePassword={handleChange("password")}
              onChangeConfirmPassword={handleChange("confirmPassword")}
              showConfirmPassword={true}
              enableAutoComplete={false}
            />
            <Typography color="error">
              {formErrors.password || formErrors.confirmPassword}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap="8px"
              flexDirection="column"
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, borderRadius: "50px", padding: "6px 20px" }}
                color="primary"
              >
                S'enregistrer
              </Button>
              <Link href="/login" variant="body2">
                Déjà un compte ? Connectez-vous
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegisterPage;
