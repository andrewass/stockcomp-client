import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../context/UserContext";

const ProtectedRoute = ({children, ...rest}) => {

    const {isSignedIn} = useContext(UserContext);

    return (
        <Route {...rest} render={() => {
            return isSignedIn ? children : <Redirect to="/authentication"/>
        }}/>
    );
}

export default ProtectedRoute;
