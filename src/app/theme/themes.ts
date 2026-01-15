import {
	createTheme,
	responsiveFontSizes,
	type TypographyVariantsOptions,
} from "@mui/material/styles";
import { styledLink } from "./linkTheme";

const baseTypography: TypographyVariantsOptions = {
	fontFamily: "Open Sans, Arial, sans-serif",
	h1: {
		fontSize: "5rem",
	},
	h2: {
		fontSize: "4rem",
	},
	h3: {
		fontSize: "3rem",
	},
	h4: {
		fontSize: "2rem",
	},
	h5: {
		fontSize: "1.5rem",
	},
	body1: {
		fontSize: "0.90rem",
	},
	button: {
		fontSize: "0.90rem",
		textTransform: "none",
	},
};

const baseComponents = {
	MuiLink: styledLink,
};

export const customBorderColor = "#878484";

export const darkThemeMode = "dark";
export const lightThemeMode = "light";

export const lightTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: "light",
			primary: {
				main: "#ffffff",
				contrastText: "#000000",
			},
			secondary: {
				main: "#ddd6d6",
				contrastText: "#ffffff",
			},
			background: {
				default: "#ffffff",
				paper: "#ddd6d6",
			},
			text: {
				primary: "#212121",
				secondary: "#616161",
			},
		},
		typography: baseTypography,
		components: baseComponents,
	}),
);

export const darkTheme = responsiveFontSizes(
	createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#100f0f",
				contrastText: "#ffffff",
			},
			secondary: {
				main: "#1c1919",
				contrastText: "#000000",
			},
			background: {
				default: "#100f0f",
				paper: "#1c1919",
			},
			text: {
				primary: "#ffffff",
				secondary: "#e0e0e0",
			},
		},
		typography: baseTypography,
		components: baseComponents,
	}),
);
