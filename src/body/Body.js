import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./contest/Contest";
import Leaderboard from "./leaderboard/Leaderboard";
import Symbols from "./common-symbol/symbols/Symbols";
import UserAccount from "./account/UserAccount";
import ProtectedRoute from "../util/ProtectedRoute";
import {AdminPage} from "../admin/AdminPage";
import Symbol from "./common-symbol/symbol/Symbol";
import Header from "../header/Header";
import Authentication from "./authentication/Authentication";

const Body = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/contests">
                    <Header/>
                    <Contest/>
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
                <Route path="/admin">
                    <AdminPage/>
                </Route>
                <ProtectedRoute path="/account">
                    <Header/>
                    <UserAccount/>
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
