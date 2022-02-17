import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./config/myTheme";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/queryConfig";
import {responseInterceptor, requestInterceptor} from "./service/interceptor";
import {ReactQueryDevtools} from "react-query/devtools";


const App = () => {

    return (
        <Router>
            <ThemeProvider theme={myTheme}>
                <QueryClientProvider client={queryClient}>
                    <Body/>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
