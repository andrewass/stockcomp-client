import { IconButton } from "@mui/material";
import type { ReactNode } from "react";
import { useThemeMode } from "../../theme/ThemeContext.ts";

interface Props {
	icon: ReactNode;
	onClick: () => void;
}

export default function StyledIconButton({ icon, onClick }: Props) {
	const { activeTheme } = useThemeMode();

	return (
		<IconButton
			sx={{ color: activeTheme.palette.primary.contrastText }}
			onClick={onClick}
		>
			{icon}
		</IconButton>
	);
}
