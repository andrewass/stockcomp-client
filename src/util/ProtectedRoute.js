import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";
import {LOCALSTORAGE_KEY} from "../service/authService";

const ProtectedRoute = ({children, ...rest}) => {

    const [isSignedIn] = useState(
        localStorage.getItem(LOCALSTORAGE_KEY) === "true"
    );

    return (
        <Route {...rest} render={() => {
            return isSignedIn ? children : <Redirect to="/authentication"/>
        }}/>
    );
}

export default ProtectedRoute;
