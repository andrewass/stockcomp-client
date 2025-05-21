import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/queryConfig";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";
import {routeTree} from "./routeTree.gen";
import {lightTheme} from "../themes";
import {AuthProvider, useAuth} from "./auth/Auth";


const router = createRouter({
    routeTree,
    context: {
        auth: undefined!
    },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}


function InnerApp(){
    const auth = useAuth();
    return(
        <RouterProvider router={router} context={{auth}}/>
    )
}

export default function App() {

    return (
        <ThemeProvider theme={lightTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline>
                        <AuthProvider>
                            <InnerApp/>
                        </AuthProvider>
                    </CssBaseline>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
