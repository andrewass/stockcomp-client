import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import SymbolProvider from "./config/SymbolContext";
import UserProvider from "./config/UserContext";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./config/MyTheme";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/QueryConfig";
import {responseInterceptor, requestInterceptor} from "./service/interceptor";


const App = () => {

    return (
        <Router>
            <UserProvider>
                <SymbolProvider>
                    <ThemeProvider theme={myTheme}>
                        <QueryClientProvider client={queryClient}>
                            <Body/>
                        </QueryClientProvider>
                    </ThemeProvider>
                </SymbolProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
