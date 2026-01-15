import { TableRow } from "@mui/material";
import type { ReactNode } from "react";
import { useThemeMode } from "../../theme/ThemeContext.ts";
import { darkTheme, lightTheme } from "../../theme/themes.ts";

interface Props {
	children: ReactNode;
	rowId: number | string;
}

export default function StyledTableRow({ children, rowId }: Props) {
	const { activeTheme } = useThemeMode();

	return (
		<TableRow
			key={rowId}
			sx={{
				backgroundColor:
					activeTheme === lightTheme
						? lightTheme.palette.primary.main
						: darkTheme.palette.secondary.main,
			}}
		>
			{children}
		</TableRow>
	);
}
