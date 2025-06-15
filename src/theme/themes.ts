import {
  createTheme,
  responsiveFontSizes,
  Theme,
  TypographyVariantsOptions,
} from "@mui/material/styles";
import { styledTableCell } from "./tableTheme";
import { styledLink } from "./linkTheme";

const baseTypography: TypographyVariantsOptions = {
  fontFamily: "Open Sans, Arial, sans-serif",
  h1: {
    fontSize: 5,
    fontWeight: 700,
  },
  body1: {
    fontSize: 1.5,
  },
  button: {
    fontSize: 2,
    textTransform: "none",
  },
};

const baseComponents = {
  MuiTableCell: styledTableCell,
  MuiLink: styledLink,
};

export const lightTheme: Theme = responsiveFontSizes(
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

export const darkTheme: Theme = responsiveFontSizes(
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
