"use client";

import { useMediaQuery } from "@mui/material";
import { useThemeMode } from "../../../theme/ThemeContext.ts";
import DefaultNavigationDropDown from "./DefaultNavigationDropDown";
import DefaultNavigationWide from "./DefaultNavigationWide";

export const DefaultNavigation = () => {
	const { activeTheme } = useThemeMode();
	const isLargeWidth = useMediaQuery(activeTheme.breakpoints.up("lg"));

	function signOutUser() {
		window.location.reload();
	}

	return isLargeWidth ? (
		<DefaultNavigationWide signOutUser={signOutUser} />
	) : (
		<DefaultNavigationDropDown signOutUser={signOutUser} />
	);
};
