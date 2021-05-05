import React from "react";
import signInIcon from "../icons/login.svg"
import {NavLink} from "react-router-dom";
import AuthenticationState from "./AuthenticationState";
import AccountDropDown from "./AccountDropDown";

const Authentication = () => {

    const {isSignedIn} = AuthenticationState();

    if (isSignedIn) {
        return (
            <AccountDropDown/>
        );
    } else {
        return (
            <NavLink to="/sign-in" className="navItem">
                <img src={signInIcon} className="headerIcon" alt="sign in icon"/>
                <span className="headerText">SIGN IN</span>
            </NavLink>
        );
    }
};

export default Authentication;
