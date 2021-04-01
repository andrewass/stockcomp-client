import React from "react";
import authService from "../service/authService"
import signInIcon from "../icons/login.svg"
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
                <NavLink to="/user" className="link">User Settings</NavLink>
                <NavLink to="/problems">
                    <span className="headerText" onClick={signOutUser}>Sign Out</span>
                </NavLink>
            </React.Fragment>
        );
    } else {
        return (
            <NavLink to="/sign-in" className="link">
                <img src={signInIcon} className="headerIcon"/>
                <span className="headerText">SIGN-IN</span>
            </NavLink>
        );
    }
};

export default Authentication;