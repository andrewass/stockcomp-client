import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import SymbolProvider from "./context/SymbolContext";
import UserProvider from "./context/UserContext";
import {responseInterceptor, requestInterceptor} from "./service/interceptor";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./util/MyTheme";


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
