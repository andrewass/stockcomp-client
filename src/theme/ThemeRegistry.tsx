"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { type ReactNode } from "react";
import { createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

//const THEME_STORAGE_KEY = "appThemeMode";

const appTheme = createTheme({
	colorSchemes: {
		dark: true, // Enables dark mode
		light: true,
	},
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	/*
	const [appTheme, setAppTheme] = useState<Theme>(lightTheme);

	useEffect(() => {
		const storedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedThemeMode === "dark") {
			setAppTheme(darkTheme);
		} else {
			setAppTheme(lightTheme);
		}
	}, []);

	const toggleTheme = () => {
		const currentThemeIsLight = appTheme === lightTheme;
		setAppTheme(currentThemeIsLight ? darkTheme : lightTheme);
		localStorage.setItem(
			THEME_STORAGE_KEY,
			currentThemeIsLight ? "dark" : "light",
		);
	};

     */

	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={appTheme} defaultMode="system">
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
