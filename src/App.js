import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./Body";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./config/myTheme";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/queryConfig";
import {ReactQueryDevtools} from "react-query/devtools";
import {AuthProvider} from "react-oidc-context";
import {responseInterceptor, requestInterceptor} from "./config/interceptor";
import {oidcConfig} from "./config/oidc";


const App = () => {

    return (
        <Router>
            <AuthProvider {...oidcConfig}>
                <ThemeProvider theme={myTheme}>
                    <QueryClientProvider client={queryClient}>
                        <Body/>
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </QueryClientProvider>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default App;
