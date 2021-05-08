import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./contest/Contest";
import Leaderboard from "./leaderboard/Leaderboard";
import Symbols from "./symbols/Symbols";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import DetailBlock from "./symbols/details/DetailBlock";
import "./body.css";
import UserAccount from "./account/UserAccount";

const Body = () => {

    return (
        <Switch>
            <Route path="/contests" component={Contest}/>
            <Route path="/leaderboard" component={Leaderboard}/>
            <Route path="/symbol-detail" component={DetailBlock}/>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/sign-up" component={SignUp}/>
            <Route path="/account" component={UserAccount}/>
            <Route path="*" component={Symbols}/>
        </Switch>
    );
}

export default Body;
