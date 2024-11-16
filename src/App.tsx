import React from 'react';
import {ThemeProvider} from "@mui/material";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "./config/queryConfig";
import {myTheme} from "./styles/theme/myTheme";
import {Body} from "./Body";


const App = () => {
    return (
        <ThemeProvider theme={myTheme}>
            <QueryClientProvider client={queryClient}>
                <Body/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
