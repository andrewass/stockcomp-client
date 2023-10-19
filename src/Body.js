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
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";


const LayoutComponent = () => (
    <>
        <DefaultNavigation/>
        <Outlet/>
    </>
);

const AdminLayoutComponent = () => (
    <>
        <AdminNavigation/>
        <Outlet/>
    </>
);

const router = createBrowserRouter([
    {
        element: <LayoutComponent/>,
        children: [
            {path: "symbols", element: <TrendingSymbols/>},
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
            {path: "admin/", element:<AdminContests/>},
            {path: "admin/contests", element: <AdminContests/>},
            {path: "admin/contests/create", element: <AdminCreateContest/>},
            {path: "admin/users", element: <AdminUsers/>}
        ]
    },
]);

export const Body = () => {
    return (
        <RouterProvider router={router}/>
    );
}
