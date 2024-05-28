import TextField from "@mui/material/TextField";
import { useState } from "react";

interface MailInputFormProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function MailInputForm({ defaultValue, onChange }: MailInputFormProps) {
  // Création d'un état pour l'adresse e-mail
  const [email, setEmail] = useState(defaultValue || "");

  // Fonction pour gérer le changement de l'adresse e-mail
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (onChange) {
      onChange(newEmail);
    }
  };

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
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
      label="Adresse Mail"
      name="email"
      autoComplete="email"
      type="email"
      autoFocus
      value={email}
      onChange={handleChange}
    />
  );
}

export default MailInputForm;
