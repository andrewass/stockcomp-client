import {createTheme} from "@mui/material";

export const navigationBarTheme = createTheme({
    palette: {
        primary: {
            main: "#1976d2"
        },
        secondary: {
            main: "#fff"
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                    fontFamily: "'Roboto', sans-serif"
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
        },
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
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    padding: "8px 16px",
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)"
                }
            }
        }
    }
});
