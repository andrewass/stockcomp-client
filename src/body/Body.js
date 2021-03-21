import React from "react";
import {Route, Switch} from "react-router-dom";
import Contest from "./Contest";
import Leaderboard from "./Leaderboard";
import Stocks from "./stocks/Stocks";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";

const Body = (props) => {

    return (
        <div className="bodySection">
            <Switch>
                <Route path="/contest" component={Contest}/>
                <Route path="/leaderboard" component={Leaderboard}/>
                <Route path="/sign-in" render={() => <SignIn setSignedIn={props.setSignedIn}/>}/>
                <Route path="/sign-up" render={() => <SignUp setSignedIn={props.setSignedIn}/>}/>
                <Route path="*" component={Stocks}/>
            </Switch>
        </div>
    );
};

export default Body;