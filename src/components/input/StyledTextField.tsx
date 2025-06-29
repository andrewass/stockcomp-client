import { useThemeContext } from "../../theme/AppThemeContext";
import { AutocompleteRenderInputParams, TextField } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  label: string;
  name?: string;
  autoCompleteParams?: AutocompleteRenderInputParams;
  error?: boolean | undefined;
  fullWidth?: boolean | undefined;
  helperText?: ReactNode;
  value?: string | number | undefined;
}

export default function StyledTextField({
  autoCompleteParams,
  ...props
}: Props) {
  const { appTheme } = useThemeContext();
  const contrastColor = appTheme.palette.primary.contrastText;
  const borderColor = "#878484";

  return (
    <TextField
      {...autoCompleteParams}
      {...props}
      sx={{
        "& label": { color: contrastColor },
        "& label.Mui-focused": { color: contrastColor },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: borderColor,
          },
          "&.Mui-focused fieldset": {
            borderColor: borderColor,
          },
          "&:hover fieldset": {
            borderColor: contrastColor,
          },
          "&.Mui-focused:hover fieldset": {
            borderColor: contrastColor,
          },
        },
      }}
    />
  );
}
