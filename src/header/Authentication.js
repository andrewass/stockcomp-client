import React from "react";
import authService from "../service/authService"
import signInIcon from "../icons/login.svg"
import signOutIcon from "../icons/logout.svg";
import settingsIcon from "../icons/user.svg";
import {NavLink} from "react-router-dom";

const Authentication = ({signedIn, setSignedIn}) => {

    const signOutUser = () => {
        authService.signOut(localStorage.getItem("username"))
            .then(() => {
                localStorage.clear();
                setSignedIn(false);
            }).catch((error) => console.log(error));
    };

    if (signedIn) {
        return (
            <React.Fragment>
                <NavLink to="/user" className="link">
                    <img src={settingsIcon} className="headerIcon" alt="settings icon" />
                    <span className="headerText">SETTINGS</span>
                </NavLink>
                <NavLink to="/problems" className="link">
                    <img src={signOutIcon} className="headerIcon" alt="sign out icon"/>
                    <span className="headerText" onClick={signOutUser}>SIGN OUT</span>
                </NavLink>
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