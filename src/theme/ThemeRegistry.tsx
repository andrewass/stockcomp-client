"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { type ReactNode, useEffect, useState } from "react";
import { ThemeContext, type ThemeMode } from "./ThemeContext.ts";
import {
	darkTheme,
	darkThemeMode,
	lightTheme,
	lightThemeMode,
} from "./themes.ts";

const THEME_STORAGE_KEY = "appThemeMode";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	const [themeMode, setThemeMode] = useState<ThemeMode>(darkThemeMode);

	useEffect(() => {
		const storedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedThemeMode && storedThemeMode === darkThemeMode) {
			setThemeMode(darkThemeMode);
		} else {
			setThemeMode(lightThemeMode);
		}
	}, []);

	const toggleTheme = () => {
		const currentThemeIsLight = themeMode === lightThemeMode;
		setThemeMode(currentThemeIsLight ? darkThemeMode : lightThemeMode);
		localStorage.setItem(
			THEME_STORAGE_KEY,
			currentThemeIsLight ? darkThemeMode : lightThemeMode,
		);
	};

	return (
		<AppRouterCacheProvider>
			<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
				<ThemeProvider
					theme={themeMode === lightThemeMode ? lightTheme : darkTheme}
				>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</ThemeContext.Provider>
		</AppRouterCacheProvider>
	);
}
