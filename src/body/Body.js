import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./Contest";
import Leaderboard from "./Leaderboard";
import Symbols from "./symbols/Symbols";
import SignIn from "./auth-forms/sign-in/SignIn";
import SignUp from "./auth-forms/sign-up/SignUp";

const Body = (props) => {

    return (
        <div className="bodySection">
            <Switch>
                <Route path="/contests" component={Contest}/>
                <Route path="/leaderboard" component={Leaderboard}/>
                <Route path="/sign-in" render={() => <SignIn setSignedIn={props.setSignedIn}/>}/>
                <Route path="/sign-up" render={() => <SignUp setSignedIn={props.setSignedIn}/>}/>
                <Route path="*" component={Symbols}/>
            </Switch>
        </div>
    );
};

export default Body;