"use client";

import { FormControlLabel, Switch } from "@mui/material";
import { useThemeMode } from "../theme/ThemeContext.ts";
import { darkTheme } from "../theme/themes.ts";

export default function MainPage() {
	const { activeTheme, toggleTheme } = useThemeMode();

	return (
		<div>
			<p>Hello</p>
			<FormControlLabel
				control={
					<Switch checked={activeTheme === darkTheme} onChange={toggleTheme} />
				}
				label={activeTheme === darkTheme ? "Dark Mode" : "Light Mode"}
			/>
		</div>
	);
}
