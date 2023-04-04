import React from 'react';
import Body from "./Body";
import {ThemeProvider} from "@mui/material";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/queryConfig";
import {ReactQueryDevtools} from "react-query/devtools";
import {AuthProvider} from "react-oidc-context";
import {oidcConfig, onSignInCallback} from "./config/oidcConfig";
import {myTheme} from "./styles/theme/myTheme";


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
