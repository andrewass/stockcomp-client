import {createTheme, responsiveFontSizes, TypographyVariantsOptions} from '@mui/material/styles';

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

export const lightTheme = responsiveFontSizes(createTheme({
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
}));

export const darkTheme = responsiveFontSizes(createTheme({
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
}));
