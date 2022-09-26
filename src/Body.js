import {Route, Routes} from "react-router-dom";
import Contests from "./pages/Contests";
import Leaderboard from "./pages/Leaderboard";
import TrendingSymbols from "./components/trendingsymbols/TrendingSymbols";
import ProtectedRoute from "./config/ProtectedRoute";
import SymbolDetails from "./pages/SymbolDetails";
import Header from "./components/header/Header";
import Authentication from "./pages/Authentication";
import AccountSettings from "./pages/AccountSettings";
import UserDetails from "./pages/UserDetails";
import ContestDetails from "./pages/ContestDetails";
import {AdminHeader} from "./components/header/AdminHeader";
import AdminContests from "./pages/AdminContests";
import AdminCreateContest from "./pages/AdminCreateContest";
import AdminUpdateContest from "./pages/AdminUpdateContest";

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
                            <AccountSettings/>
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
                            <AdminHeader/>
                            <AdminContests/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/contests/create"
                    element={
                        <ProtectedRoute>
                            <AdminHeader/>
                            <AdminCreateContest/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/contests/update"
                    element={
                        <ProtectedRoute>
                            <AdminHeader/>
                            <AdminUpdateContest/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default Body;
