import {createTheme} from "@mui/material";

const myTheme = createTheme({
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 0,
                    "&:last-child": {
                        paddingBottom: 0
                    }
                }
            }
        },
        MuiCircularProgress:{
            styleOverrides: {
                root:{
                    width:"20%",
                    margin:"10% 40%",
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        }
    }
});

export {myTheme};