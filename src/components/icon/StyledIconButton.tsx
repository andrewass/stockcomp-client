import { IconButton } from "@mui/material";
import { useThemeContext } from "../../theme/AppThemeContext";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  onClick: () => void;
}

export default function StyledIconButton({ icon, onClick }: Props) {
  const { appTheme } = useThemeContext();

  return (
    <IconButton
      sx={{ color: appTheme.palette.primary.contrastText }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  );
}
