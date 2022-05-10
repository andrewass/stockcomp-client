import {Route, Routes} from "react-router-dom";
import Contests from "./contests/Contests";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {Symbols} from "./common-symbol/symbols/Symbols";
import ProtectedRoute from "../config/ProtectedRoute";
import AdminPage from "../admin/AdminPage";
import Symbol from "./common-symbol/symbol/Symbol";
import Header from "../header/Header";
import Authentication from "./authentication/Authentication";
import UserAccount from "./account/UserAccount";
import {UserDetails} from "./user/UserDetails";
import ContestDetail from "./contests/contest-detail/ContestDetail";

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
                            <Symbol/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage/>
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
                            <Symbols/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default Body;
