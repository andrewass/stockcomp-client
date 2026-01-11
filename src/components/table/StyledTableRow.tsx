import { TableRow } from "@mui/material";
import type { ReactNode } from "react";
import type { ThemeMode } from "../../theme/ThemeContext.ts";
import { darkTheme, lightTheme, lightThemeMode } from "../../theme/themes.ts";

interface Props {
	children: ReactNode;
	rowId: number | string;
	themeMode: ThemeMode;
}

export default function StyledTableRow({ children, rowId, themeMode }: Props) {
	return (
		<TableRow
			key={rowId}
			sx={{
				backgroundColor:
					themeMode === lightThemeMode
						? lightTheme.palette.primary.main
						: darkTheme.palette.secondary.main,
			}}
		>
			{children}
		</TableRow>
	);
}
