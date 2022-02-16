import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Body from "./body/Body";
import {UserProvider} from "./config/UserContext";
import {ThemeProvider} from "@mui/material";
import {myTheme} from "./config/MyTheme";
import {QueryClientProvider} from "react-query";
import {queryClient} from "./config/QueryConfig";
import {responseInterceptor, requestInterceptor} from "./service/interceptor";
import {ReactQueryDevtools} from "react-query/devtools";


const App = () => {

    return (
        <Router>
            <UserProvider>
                <ThemeProvider theme={myTheme}>
                    <QueryClientProvider client={queryClient}>
                        <Body/>
                        <ReactQueryDevtools initialIsOpen={false}/>
                    </QueryClientProvider>
                </ThemeProvider>
            </UserProvider>
        </Router>
    );
};

export default App;
