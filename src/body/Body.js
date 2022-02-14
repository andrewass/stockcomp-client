import {Route, Switch} from "react-router-dom";
import Contests from "./contests/Contests";
import {Leaderboard} from "./leaderboard/Leaderboard";
import {Symbols} from "./common-symbol/symbols/Symbols";
import ProtectedRoute from "../config/ProtectedRoute";
import {AdminPage} from "../admin/AdminPage";
import Symbol from "./common-symbol/symbol/Symbol";
import Header from "../header/Header";
import Authentication from "./authentication/Authentication";
import UserAccount from "./account/UserAccount";
import {UserDetails} from "./user/UserDetails";
import ContestDetail from "./contests/contest-detail/ContestDetail";

const Body = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/contests">
                    <Header/>
                    <Contests/>
                </ProtectedRoute>
                <ProtectedRoute path="/contest-detail">
                    <Header/>
                    <ContestDetail/>
                </ProtectedRoute>
                <ProtectedRoute path="/leaderboard">
                    <Header/>
                    <Leaderboard/>
                </ProtectedRoute>
                <ProtectedRoute path="/symbol-detail">
                    <Header/>
                    <Symbol/>
                </ProtectedRoute>
                <Route path="/authentication">
                    <Authentication/>
                </Route>
                <ProtectedRoute path="/admin">
                    <AdminPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/account">
                    <Header/>
                    <UserAccount/>
                </ProtectedRoute>
                <ProtectedRoute path="/user/:username">
                    <Header/>
                    <UserDetails/>
                </ProtectedRoute>
                <ProtectedRoute path="*">
                    <Header/>
                    <Symbols/>
                </ProtectedRoute>
            </Switch>
        </div>
    );
}

export default Body;
