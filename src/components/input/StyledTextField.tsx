import { useThemeContext } from "../../theme/AppThemeContext";
import { AutocompleteRenderInputParams, TextField } from "@mui/material";

interface Props {
  label: string;
  autoCompleteParams?: AutocompleteRenderInputParams;
}

export default function StyledTextField({
  label,
  autoCompleteParams,
}: Props) {
  const { appTheme } = useThemeContext();
  const contrastColor = appTheme.palette.primary.contrastText;
  const borderColor = "#878484";

  return (
    <TextField
      {...autoCompleteParams}
      label={label}
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
