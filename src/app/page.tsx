"use client";

import { FormControlLabel, Switch } from "@mui/material";
import { useThemeMode } from "../theme/ThemeContext.ts";
import { darkThemeMode } from "../theme/themes.ts";

export default function MainPage() {
	const { themeMode, toggleTheme } = useThemeMode();

	return (
		<div>
			<p>Hello</p>
			<FormControlLabel
				control={
					<Switch
						checked={themeMode === darkThemeMode}
						onChange={toggleTheme}
					/>
				}
				label={themeMode === darkThemeMode ? "Dark Mode" : "Light Mode"}
			/>
		</div>
	);
}

/*
export default function App() {
	return (
		<AppThemeProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</LocalizationProvider>
		</AppThemeProvider>
	);
}

 */
