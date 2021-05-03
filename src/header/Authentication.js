import React, {useEffect} from "react";
import signInIcon from "../icons/login.svg"
import signOutIcon from "../icons/logout.svg";
import settingsIcon from "../icons/user.svg";
import {NavLink} from "react-router-dom";
import AuthenticationState from "./AuthenticationState";

const Authentication = () => {

    const {isSignedIn, signOutUser} = AuthenticationState();

    useEffect(() => {
        console.log("Triggering use effect on authentication component");
    }, [isSignedIn]);

    if (isSignedIn) {
        return (
            <React.Fragment>
                <NavLink to="/user" className="link">
                    <img src={settingsIcon} className="headerIcon" alt="settings icon"/>
                    <span className="headerText">SETTINGS</span>
                </NavLink>
                <button>
                    <img src={signOutIcon} className="headerIcon" alt="sign out icon"/>
                    <span className="headerText" onClick={signOutUser}>SIGN OUT</span>
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <NavLink to="/sign-in" className="link">
                <img src={signInIcon} className="headerIcon" alt="sign in icon"/>
                <span className="headerText">SIGN IN</span>
            </NavLink>
        );
    }
};

export default Authentication;
