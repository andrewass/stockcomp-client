import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import Contests from "./contests/Contests";
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import {UserDetails} from "./user/UserDetails";
import SymbolDetails from "./symboldetails/SymbolDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";
import {AdminNavigation} from "./navigation/admin/AdminNavigation";
import AccountDetails from "./account/AccountDetails";
import AdminContests from "./admin/contests/AdminContests";
import AdminCreateContest from "./admin/contests/AdminCreateContest";
import {AdminUsers} from "./admin/users/AdminUsers";


const ProtectedComponent = () => {
    return (
        <ProtectedRoute>
            <DefaultNavigation/>
            <Outlet/>
        </ProtectedRoute>
    );
}

const ProtectedAdminComponent = () => {
    return (
        <ProtectedRoute>
            <AdminNavigation/>
            <Outlet/>
        </ProtectedRoute>
    );
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<ProtectedComponent/>}>
                <Route index element={<TrendingSymbols/>}/>

                <Route path="symbols" element={<TrendingSymbols/>}/>
                <Route path="symbols/:symbol" element={<SymbolDetails/>}/>

                <Route path="contests" element={<Contests/>}/>
                <Route path="contests/:contestNumber" element={<ContestDetails/>}/>

                <Route path="leaderboard" element={<Leaderboard/>}/>

                <Route path="account" element={<AccountDetails/>}/>

                <Route path="user/:username" element={<UserDetails/>}/>
            </Route>
            <Route path="admin" element={<ProtectedAdminComponent/>}>
                <Route index element={<AdminContests/>}/>

                <Route path="contests" element={<AdminContests/>}/>
                <Route path="contests/create" element={<AdminCreateContest/>}/>

                <Route path="users" element={<AdminUsers/>}/>
            </Route>
        </Route>
    )
);


export const Body = () => {
    return (
        <RouterProvider router={router}/>
    );
}
