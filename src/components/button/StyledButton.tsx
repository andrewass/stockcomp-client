import { Button } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";

interface Props {
  variant: "outlined";
  type: "submit";
  buttonText: string;
}

export default function StyledButton({
  variant,
  type,
  buttonText,
  ...rest
}: Props) {
  const { appTheme } = useThemeContext();

  return (
    <Button
      variant={variant}
      type={type}
      sx={{
        color: appTheme.palette.primary.contrastText,
        backgroundColor: appTheme.palette.secondary.main,
      }}
      {...rest}
    >
      {buttonText}
    </Button>
  );
}
