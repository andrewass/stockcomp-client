import {CssBaseline, ThemeProvider} from "@mui/material";
import {myTheme} from "./styles/theme/myTheme";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/queryConfig";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import "./root.css";
import {routeTree} from './routeTree.gen'
import {createRouter, RouterProvider} from "@tanstack/react-router";

/*
const ProtectedComponent = () => {
    return (
        <ProtectedRoute>
            <DefaultNavigation/>
            <DefaultLayout>
                <Outlet/>
            </DefaultLayout>
        </ProtectedRoute>
    );
}


const AdminLayoutComponent = () => (
    <ProtectedRoute>
        <AdminNavigation/>
        <DefaultLayout>
            <Outlet/>
        </DefaultLayout>
    </ProtectedRoute>
);

const router = createBrowserRouter([
        {
            element: <ProtectedComponent/>,
            children: [
                {path: "symbols", element: <SymbolsPage/>},
                {path: "symbols/:symbol", element: <SymbolDetailsPage/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "contests", element: <ContestsPage/>},
                {path: "contests/:contestId", element: <ContestPage/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "account", element: <AccountDetails/>},
                {path: "user/:username", element: <UserDetails/>}
            ]
        },
        {
            element: <AdminLayoutComponent/>,
            children: [
                {path: "admin/", element: <AdminContestsPage/>},
                {path: "admin/contests", element: <AdminContestsPage/>},
                {path: "admin/users", element: <AdminUsers/>}
            ]
        },
    ]
);


 */

const router = createRouter({routeTree})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={myTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline>
                        <RouterProvider router={router}/>
                    </CssBaseline>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </LocalizationProvider>
        </ThemeProvider>
    </React.StrictMode>
);
