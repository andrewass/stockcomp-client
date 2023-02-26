import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Contests from "./contests/Contests";
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import UserDetails from "./user/UserDetails";
import AdminContests from "./admin/AdminContests";
import AdminCreateContest from "./admin/AdminCreateContest";
import AdminUpdateContest from "./admin/AdminUpdateContest";
import SymbolDetails from "./symboldetails/SymbolDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {Header} from "./navigation/general/Header";
import {AdminNavigation} from "./navigation/admin/AdminNavigation";
import AccountDetails from "./account/AccountDetails";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <TrendingSymbols/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="contests"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <Contests/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="contest/:contestNumber"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <ContestDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="leaderboard"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <Leaderboard/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="symbol/:symbol"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <SymbolDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="account"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <AccountDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="user/:username"
                element={
                    <ProtectedRoute>
                        <Header/>
                        <UserDetails/>
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={
                    <ProtectedRoute>
                        <Header/>
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
