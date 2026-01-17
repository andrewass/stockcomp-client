"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { queryClient } from "../../config/queryConfig.ts";
import { type ActiveTheme, ThemeContext } from "./ThemeContext.ts";
import { darkTheme, lightTheme } from "./themes.ts";

const THEME_STORAGE_KEY = "appThemeMode";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
	const [activeTheme, setActiveTheme] = useState<ActiveTheme>(darkTheme);

	useEffect(() => {
		const storedThemeMode = localStorage.getItem(THEME_STORAGE_KEY);
		if (storedThemeMode && storedThemeMode === "dark") {
			setActiveTheme(darkTheme);
		} else {
			setActiveTheme(lightTheme);
		}
	}, []);

	function toggleTheme() {
		const newTheme = activeTheme === lightTheme ? darkTheme : lightTheme;
		setActiveTheme(newTheme);
		localStorage.setItem(
			THEME_STORAGE_KEY,
			newTheme === lightTheme ? "light" : "dark",
		);
	}

	return (
		<AppRouterCacheProvider>
			<ThemeContext.Provider value={{ activeTheme, toggleTheme }}>
				<ThemeProvider theme={activeTheme}>
					<QueryClientProvider client={queryClient}>
						<CssBaseline />
						{children}
					</QueryClientProvider>
				</ThemeProvider>
			</ThemeContext.Provider>
		</AppRouterCacheProvider>
	);
}
