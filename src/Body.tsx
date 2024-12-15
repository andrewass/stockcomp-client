import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Contests from "./contests/Contests";
import {UserDetails} from "./user/UserDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";
import {AdminNavigation} from "./navigation/admin/AdminNavigation";
import AccountDetails from "./account/AccountDetails";
import AdminContests from "./admin/contests/AdminContests";
import AdminCreateContest from "./admin/contests/AdminCreateContest";
import {AdminUsers} from "./admin/users/AdminUsers";
import {ProtectedRoute} from "./config/ProtectedRoute";
import TrendingSymbolsPage from "./pages/symbols/TrendingSymbolsPage";
import SymbolDetailsPage from "./pages/symboldetails/SymbolDetailsPage";


const ProtectedComponent = () => {
    return (
        <ProtectedRoute>
            <DefaultNavigation/>
            <Outlet/>
        </ProtectedRoute>
    );
}

const AdminLayoutComponent = () => (
    <ProtectedRoute>
        <AdminNavigation/>
        <Outlet/>
    </ProtectedRoute>
);

const router = createBrowserRouter([
        {
            element: <ProtectedComponent/>,
            children: [
                {path: "symbols", element: <TrendingSymbolsPage/>},
                {path: "symbols/:symbol", element: <SymbolDetailsPage/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "contests", element: <Contests/>},
                {path: "contests/:contestNumber", element: <ContestDetails/>},
                {path: "leaderboard", element: <Leaderboard/>},
                {path: "account", element: <AccountDetails/>},
                {path: "user/:username", element: <UserDetails/>}
            ]
        },
        {
            element: <AdminLayoutComponent/>,
            children: [
                {path: "admin/", element: <AdminContests/>},
                {path: "admin/contests", element: <AdminContests/>},
                {path: "admin/contests/create", element: <AdminCreateContest/>},
                {path: "admin/users", element: <AdminUsers/>}
            ]
        },
    ],
    {
        future: {
            v7_skipActionErrorRevalidation: true,
            v7_normalizeFormMethod: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_partialHydration: true,
        },
    });

export const Body = () => {
    return (
        <RouterProvider router={router} future={{v7_startTransition: true}}/>
    );
}
