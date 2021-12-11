import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({children, ...rest}) => {

    const [isSignedIn, setSignedIn] = useState(
        localStorage.getItem("isSignedIn") === "true"
    );

    return (
        <Route {...rest} render={() => {
            return isSignedIn ? children : <Redirect to="/authentication"/>
        }}/>
    );
}

export default ProtectedRoute;
