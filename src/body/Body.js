import {Route, Routes} from "react-router-dom";
import Contests from "./contests/Contests";
import Leaderboard from "../pages/Leaderboard";
import TrendingSymbols from "../pages/TrendingSymbols";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminPage from "../pages/AdminPage";
import SymbolDetails from "../pages/SymbolDetails";
import Header from "../header/Header";
import Authentication from "../pages/Authentication";
import UserAccount from "./user/UserAccount";
import {UserDetails} from "./user/UserDetails";
import ContestDetail from "./contests/contest-detail/ContestDetail";
import {AdminHeader} from "../header/AdminHeader";
import {AdminContests} from "./admin/contests/AdminContests";
import AdminCreateContest from "./admin/contests/AdminCreateContest";
import AdminUpdateContest from "./admin/contests/AdminUpdateContest";

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
                            <ContestDetail/>
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
                            <UserAccount/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Header/>
                            <UserAccount/>
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
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminHeader/>
                            <AdminPage/>
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
