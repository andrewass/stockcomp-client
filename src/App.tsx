import React from 'react';
import {Body} from "./Body";
import {ThemeProvider} from "@mui/material";
import {queryClient} from "./config/queryConfig";
import {AuthProvider} from "react-oidc-context";
import {oidcConfig, onSignInCallback} from "./config/oidcConfig";
import {myTheme} from "./styles/theme/myTheme";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const App = () => {
    return (
        <AuthProvider {...oidcConfig} onSigninCallback={onSignInCallback}>
            <ThemeProvider theme={myTheme}>
                <QueryClientProvider client={queryClient}>
                    <Body/>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
