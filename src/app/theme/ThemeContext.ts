"use client";

import { createContext, useContext } from "react";
import type { darkTheme, lightTheme } from "./themes.ts";

export type ActiveTheme = typeof lightTheme | typeof darkTheme;

export interface ThemeContextValue {
	activeTheme: ActiveTheme;
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
