import { InputLabel, MenuItem, Select } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";

type ItemMap = Record<string, string>;

interface Props {
  label: string;
  items: ItemMap;
}

export default function StyledSelect({ label, items, ...rest }: Props) {
  const { appTheme } = useThemeContext();
  const contrastColor = appTheme.palette.primary.contrastText;
  const borderColor = "#878484";

  return (
    <>
      <InputLabel
        sx={{
          color: contrastColor,
          "&.Mui-focused": {
            color: contrastColor,
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        label={label}
        {...rest}
        sx={{
          color: contrastColor,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderColor,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: contrastColor,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: contrastColor,
          },
        }}
      >
        {Object.entries(items).map(([key, val]) => (
          <MenuItem key={key} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
