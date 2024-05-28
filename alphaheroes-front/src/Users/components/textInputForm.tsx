import TextField from "@mui/material/TextField";
import { useState } from "react";

interface TextInputFormProps {
  defaultValue?: string;
  label: string;
  onChange?: (value: string) => void;
}

function TextInputForm({ defaultValue, label, onChange }: TextInputFormProps) {
  const [value, setValue] = useState(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={label}
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
      label={label}
      name={label}
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextInputForm;