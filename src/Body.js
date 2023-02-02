import {Route, Routes} from "react-router-dom";
import Contests from "./contests/Contests";
import Leaderboard from "./pages/Leaderboard";
import TrendingSymbols from "./symbols/symbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import Header from "./components/header/Header";
import Authentication from "./pages/Authentication";
import UserSettings from "./user/UserSettings";
import UserDetails from "./pages/UserDetails";
import {AdminNavigation} from "./navigation/AdminNavigation";
import AdminContests from "./admin/AdminContests";
import AdminCreateContest from "./admin/AdminCreateContest";
import AdminUpdateContest from "./admin/AdminUpdateContest";
import SymbolDetails from "./symboldetails/SymbolDetails";
import {ContestDetails} from "./contestdetails/ContestDetails";

const Body = () => {

    return (
        <div>
            <Routes>
                <Route
                    path="/authentication"
                    element={<Authentication/>}
                />

                <Route
                    path="/contests"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <Contests/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contest/:contestNumber"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <ContestDetails/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leaderboard"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <Leaderboard/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/symbol/:symbol"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <SymbolDetails/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <UserSettings/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user/:username"
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
                    path="/admin/contests"
                    element={
                        <ProtectedRoute>
                            <AdminNavigation/>
                            <AdminContests/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/contests/create"
                    element={
                        <ProtectedRoute>
                            <AdminNavigation/>
                            <AdminCreateContest/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/contests/update"
                    element={
                        <ProtectedRoute>
                            <AdminNavigation/>
                            <AdminUpdateContest/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default Body;
