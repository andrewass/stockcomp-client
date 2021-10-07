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
        MuiTab:{
            styleOverrides:{
                root:{
                    color:"inherit"
                }
            }
        }
    }
});

export {myTheme};