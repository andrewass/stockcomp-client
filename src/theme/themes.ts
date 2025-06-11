import {createTheme, responsiveFontSizes, Theme, TypographyVariantsOptions} from '@mui/material/styles';
import {styledTableCell} from "./tableTheme";
import {grey} from "@mui/material/colors";
import {styledLink} from "./linkTheme";

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
    MuiLink: styledLink
}

export const lightTheme: Theme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#000000'
        }
    },
    typography: baseTypography,
    components: baseComponents,
}));

export const darkTheme: Theme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: grey[800],
            paper: '#000000',
        },
        primary: {
            main: '#000000'
        }
    },
    typography: baseTypography,
    components: baseComponents
}));
