"use client";

import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
	themeMode: ThemeMode;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
	undefined,
);

export const useThemeMode = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeMode must be used within ThemeRegistry");
	}
	return context;
};
