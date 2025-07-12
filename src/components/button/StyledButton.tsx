import { Button } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";
import { customBorderColor } from "../../theme/themes";

interface Props {
  variant?: "outlined" | "contained" | "text";
  type?: "submit" | "button";
  buttonText: string;
  onClick?: () => void;
}

export default function StyledButton({
  variant = "outlined",
  type = "button",
  buttonText,
  onClick,
  ...rest
}: Props) {
  const { appTheme } = useThemeContext();

  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      sx={{
        border: "0.5px solid",
        borderColor: customBorderColor,
        color: appTheme.palette.primary.contrastText,
        backgroundColor: appTheme.palette.secondary.main,
      }}
      {...rest}
    >
      {buttonText}
    </Button>
  );
}
