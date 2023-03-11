import {createTheme} from "@mui/material";

export const localTheme = createTheme({
    palette: {
        primary: {
            main: "#2196f3"
        },
        secondary: {
            main: "#fff"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    textDecoration: "none"
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: "2.5rem",
                    color: "#fff"
                }
            }
        }, MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: "1rem",
                    margin: "0 0",
                    color: "#fff"
                }
            }
        }, MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#2196f3",
                    color: "#fff"
                }
            }
        }
    }
});