"use client";

import { CssBaseline, type Theme, ThemeProvider } from "@mui/material";
import { type ReactNode, useEffect, useState } from "react";
import { AppThemeContext } from "./AppThemeContext";
import { darkTheme, lightTheme } from "./themes";

const THEME_STORAGE_KEY = "appThemeMode";

export default function AppThemeProvider({
	children,
}: {
	children: ReactNode;
}) {
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

	return (
		<AppThemeContext.Provider value={{ toggleTheme, appTheme }}>
			<ThemeProvider theme={appTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppThemeContext.Provider>
	);
}
