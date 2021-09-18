import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./contest/Contest";
import Leaderboard from "./leaderboard/Leaderboard";
import Symbols from "./common-symbol/symbols/Symbols";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import "./body.css";
import UserAccount from "./account/UserAccount";
import ProtectedRoute from "../util/ProtectedRoute";
import {AdminPage} from "../admin/AdminPage";
import Symbol from "./common-symbol/symbol/Symbol";
import Header from "../header/Header";

const Body = () => {

    return (
        <div>
            <Header/>
            <Switch>
                <ProtectedRoute path="/contests">
                    <Contest/>
                </ProtectedRoute>
                <ProtectedRoute path="/leaderboard">
                    <Leaderboard/>
                </ProtectedRoute>
                <ProtectedRoute path="/symbol-detail">
                    <Symbol/>
                </ProtectedRoute>
                <Route path="/sign-in">
                    <SignIn/>
                </Route>
                <Route path="/sign-up">
                    <SignUp/>
                </Route>
                <Route path="/admin">
                    <AdminPage/>
                </Route>
                <ProtectedRoute path="/account">
                    <UserAccount/>
                </ProtectedRoute>
                <ProtectedRoute path="*">
                    <Symbols/>
                </ProtectedRoute>
            </Switch>
        </div>
    );
}

export default Body;
