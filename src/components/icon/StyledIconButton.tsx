import { IconButton } from "@mui/material";
import type { ReactNode } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";

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
