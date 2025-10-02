import { Box, Container } from "@mui/material";
import type { ReactNode } from "react";
import { DefaultNavigation } from "./navigation/default/DefaultNavigation";
import { useThemeContext } from "./theme/AppThemeContext";

interface Props {
	children: ReactNode;
}

export function DefaultLayout({ children }: Props) {
	const { appTheme } = useThemeContext();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundColor: appTheme.palette.background.default,
			}}
		>
			<DefaultNavigation />
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
