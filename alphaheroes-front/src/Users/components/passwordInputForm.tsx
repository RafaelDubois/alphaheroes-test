import React, { useState } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface PasswordInputFormProps {
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;
  showConfirmPassword: boolean;
  enableAutoComplete: boolean;
}

function PasswordInputForm({
  onChangePassword,
  onChangeConfirmPassword,
  showConfirmPassword = false,
  enableAutoComplete = true,
}: PasswordInputFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    onChangePassword(newPassword);
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    onChangeConfirmPassword(newConfirmPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mot de passe"
        type={isShowPassword ? "text" : "password"}
        id="password"
        autoComplete={enableAutoComplete ? "current-password" : "new-password"}
        value={password}
        onChange={handleChangePassword}
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
      />
      {showConfirmPassword && (
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirmation du mot de passe"
          type={isShowPassword ? "text" : "password"}
          id="confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
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
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 0.5,
        }}
      >
        <IconButton onClick={handleTogglePasswordVisibility}>
          {isShowPassword ? <VisibilityOff color="primary" /> : <Visibility />}
        </IconButton>
        <Typography variant="body2">
          {isShowPassword ? "Masquer le mot de passe" : "Voir le mot de passe"}
        </Typography>
      </Box>
    </Box>
  );
}

export default PasswordInputForm;
