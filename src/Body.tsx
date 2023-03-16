import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Contests from "./contests/Contests";
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import UserDetails from "./userdetails/UserDetails";
import AdminContests from "./admin/AdminContests";
import AdminCreateContest from "./admin/AdminCreateContest";
import AdminUpdateContest from "./admin/AdminUpdateContest";
import SymbolDetails from "./symboldetails/SymbolDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";
import {AdminNavigation} from "./navigation/admin/AdminNavigation";
import AccountDetails from "./account/AccountDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <TrendingSymbols/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="contests"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <Contests/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="contest/:contestNumber"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <ContestDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="leaderboard"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <Leaderboard/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="symbol/:symbol"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <SymbolDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="account"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <AccountDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="user/:username"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <UserDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <DefaultNavigation/>
                        <TrendingSymbols/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="admin/contests"
                element={
                    <ProtectedRoute>
                        <AdminNavigation/>
                        <AdminContests/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="admin/contests/create"
                element={
                    <ProtectedRoute>
                        <AdminNavigation/>
                        <AdminCreateContest/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="admin/contests/update"
                element={
                    <ProtectedRoute>
                        <AdminNavigation/>
                        <AdminUpdateContest/>
                    </ProtectedRoute>
                }
            />
        </Route>
    )
);


const Body = () => {
    return (
        <RouterProvider router={router}/>
    );
}

export default Body;
