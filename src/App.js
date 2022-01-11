import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import SymbolProvider from "./context/SymbolContext";
import UserProvider from "./context/UserContext";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./util/MyTheme";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

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
