import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import {LOCALSTORAGE_KEY} from "../api/authClient";

const ProtectedRoute = ({children}) => {

    const [isSignedIn] = useState(
        localStorage.getItem(LOCALSTORAGE_KEY) === "true"
    );

    if(!isSignedIn){
        return <Navigate to="/authentication"/>
    }
    return children;
}

export default ProtectedRoute;
