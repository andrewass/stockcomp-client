import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";
import AdminNavigation from "./navigation/admin/AdminNavigation";
import { useThemeContext } from "./theme/AppThemeContext";

interface Props {
	children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
	const { appTheme } = useThemeContext();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: appTheme.palette.background.default,
			}}
		>
			<AdminNavigation />
			<Box
				sx={{
					width: "100%",
					height: "120px",
					backgroundColor: appTheme.palette.secondary.main,
				}}
			/>
			<Container sx={{ mt: "100px" }} maxWidth="xl">
				{children}
			</Container>
		</Box>
	);
}
