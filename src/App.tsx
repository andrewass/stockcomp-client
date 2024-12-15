import React from 'react';
import {ThemeProvider} from "@mui/material";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {queryClient} from "./config/queryConfig";
import {myTheme} from "./styles/theme/myTheme";
import {Body} from "./Body";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {LocalizationProvider} from "@mui/x-date-pickers";


const App = () => {
    return (
        <ThemeProvider theme={myTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <QueryClientProvider client={queryClient}>
                    <Body/>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
