import React from 'react';
import {Body} from "./Body";
import {ThemeProvider} from "@mui/material";
import {queryClient} from "./config/queryConfig";
import {myTheme} from "./styles/theme/myTheme";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {AuthProvider} from "./authorization/AuthContext";


const App = () => {
    return (
        <AuthProvider>
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
