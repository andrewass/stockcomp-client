"use client";

import type { Theme } from "@mui/material";
import { createContext, useContext } from "react";

interface AppThemeContextInterface {
	toggleTheme: () => void;
	appTheme: Theme;
}

export const AppThemeContext = createContext<
	AppThemeContextInterface | undefined
>(undefined);

export function useThemeContext() {
	const context = useContext(AppThemeContext);
	if (context === undefined) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
}
