import { Toolbar } from "@mui/material";
import type { Metadata } from "next";
import type React from "react";
import { DefaultNavigation } from "@/navigation/default/DefaultNavigation.tsx";
import ThemeRegistry from "@/theme/ThemeRegistry.tsx";

export const metadata: Metadata = {
	title: "Stock Comp",
	description: "Stock Comp is a web app for arranging stock trade contests.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<DefaultNavigation />
					<Toolbar sx={{ height: "100px", marginBottom: "100px" }} />
					{children}
				</ThemeRegistry>
			</body>
		</html>
	);
}
