"use client";

import { useEffect, useState } from "react";

enum Theme {
	Light = "light",
	Dark = "dark",
}

const localStorageKey = "active_theme";

export function useTheme() {
	const [activeTheme, setActiveTheme] = useState<Theme>(Theme.Light);

	useEffect(() => {
		const savedTheme = localStorage.getItem(localStorageKey) as Theme;
		if (savedTheme) {
			setActiveTheme(savedTheme);
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", activeTheme);
	}, [activeTheme]);

	const toggleTheme = () => {
		const newTheme = activeTheme === Theme.Dark ? Theme.Light : Theme.Dark;
		setActiveTheme(newTheme);
		localStorage.setItem(localStorageKey, newTheme);
	};
	return { activeTheme, toggleTheme };
}
