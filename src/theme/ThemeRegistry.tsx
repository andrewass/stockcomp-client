"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { queryClient } from "../config/queryConfig.ts";
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

	function toggleTheme() {
		const newThemeMode =
			themeMode === lightThemeMode ? darkThemeMode : lightThemeMode;
		setThemeMode(newThemeMode);
		localStorage.setItem(THEME_STORAGE_KEY, newThemeMode);
	}

	return (
		<AppRouterCacheProvider>
			<ThemeContext.Provider value={{ themeMode, toggleTheme }}>
				<ThemeProvider
					theme={themeMode === lightThemeMode ? lightTheme : darkTheme}
				>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						{children}
					</QueryClientProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</AppRouterCacheProvider>
	);
}
