import {createTheme, responsiveFontSizes, Theme, TypographyVariantsOptions} from '@mui/material/styles';
import {styledTableCell} from "./tableTheme";

const baseTypography: TypographyVariantsOptions = {
    fontFamily: 'Open Sans", Arial, sans-serif',
    h1: {
        fontSize: '5rem',
        fontWeight: 700,
    },
    body1: {
        fontSize: '1rem',
    },
    button: {
        fontSize: '0.875rem',
        textTransform: 'none',
    },
};

const baseComponents = {
    MuiTab: {
        styleOverrides: {
            root: {
                fontWeight: "600",
                fontSize: "1.1rem",
                margin: "0 0",
                color: "#fff",
                "&$selected": {
                    backgroundColor: "#0d47a1"
                },
                "&:hover": {
                    backgroundColor: "#1976d2"
                }
            },
            selected: {}
        }
    },
    MuiTableCell: styledTableCell
}

export const lightTheme: Theme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#fff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000',
            secondary: '#555',
        },
    },
    typography: baseTypography,
    components: baseComponents,
}));

export const darkTheme: Theme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#fff',
            secondary: '#bbb',
        },
    },
    typography: baseTypography,
    components: baseComponents
}));
