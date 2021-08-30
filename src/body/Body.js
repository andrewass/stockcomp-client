import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./contest/Contest";
import Leaderboard from "./leaderboard/Leaderboard";
import Symbols from "./common-symbol/symbols/Symbols";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import DetailBlock from "./common-symbol/symbol/details/DetailBlock";
import "./body.css";
import UserAccount from "./account/UserAccount";
import ProtectedRoute from "../util/ProtectedRoute";
import {AdminPage} from "../admin/AdminPage";

const Body = () => {

    return (
        <Switch>
            <ProtectedRoute path="/contests">
                <Contest/>
            </ProtectedRoute>
            <ProtectedRoute path="/leaderboard">
                <Leaderboard/>
            </ProtectedRoute>
            <ProtectedRoute path="/symbol-detail">
                <DetailBlock/>
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
    );
}

export default Body;
