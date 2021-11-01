import React from "react";
import {Route, Switch} from "react-router-dom";
import Contests from "./contests/Contests";
import Leaderboard from "./leaderboard/Leaderboard";
import Symbols from "./common-symbol/symbols/Symbols";
import ProtectedRoute from "../util/ProtectedRoute";
import {AdminPage} from "../admin/AdminPage";
import Symbol from "./common-symbol/symbol/Symbol";
import Header from "../header/Header";
import Authentication from "./authentication/Authentication";
import UserAccountWrite from "./account/UserAccountWrite";
import UserAccountRead from "./account/UserAccountRead";

const Body = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/contests">
                    <Header/>
                    <Contests/>
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
                <ProtectedRoute path="/account-write">
                    <Header/>
                    <UserAccountWrite/>
                </ProtectedRoute>
                <ProtectedRoute path="/account-read">
                    <Header/>
                    <UserAccountRead/>
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
