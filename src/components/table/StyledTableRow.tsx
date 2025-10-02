import { TableRow } from "@mui/material";
import type { ReactNode } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";
import { lightTheme } from "../../theme/themes";

interface Props {
	children: ReactNode;
	rowId: number | string;
}

export default function StyledTableRow({ children, rowId }: Props) {
	const { appTheme } = useThemeContext();
	return (
		<TableRow
			key={rowId}
			sx={{
				backgroundColor:
					appTheme === lightTheme
						? appTheme.palette.primary.main
						: appTheme.palette.secondary.main,
			}}
		>
			{children}
		</TableRow>
	);
}
