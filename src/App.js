import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import SymbolProvider from "./context/SymbolContext";
import UserProvider from "./context/UserContext";
import {responseInterceptor, requestInterceptor} from "./service/interceptor";
import {createTheme, ThemeProvider} from "@mui/material";

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
        }
    }
});

const App = () => {

    return (
            <Router>
                <UserProvider>
                    <SymbolProvider>
                        <ThemeProvider theme={myTheme}>
                        <Body/>
                        </ThemeProvider>
                    </SymbolProvider>
                </UserProvider>
            </Router>
    );
};

export default App;
