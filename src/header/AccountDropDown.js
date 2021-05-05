import React from "react";
import {NavLink} from "react-router-dom";
import signOutIcon from "../icons/logout.svg";
import settingsIcon from "../icons/gear.svg";
import userIcon from "../icons/user.svg";
import AuthenticationState from "./AuthenticationState";
import "./header.css";


const AccountDropDown = () => {

    const {signOutUser} = AuthenticationState();

    return (
        <div id="accountDropDown">
            <button id="dropDownButton">
                <img src={settingsIcon} className="headerIcon" alt="sign in icon"/>
                <span className="headerText">SETTINGS</span>
            </button>
            <div id="dropDownItems">
                <NavLink to="/account" className="dropDownItem">
                    <img src={userIcon} className="dropDownItemIcon" alt="account icon"/>
                    <span className="dropDownItemText">ACCOUNT</span>
                </NavLink>
                <button className="dropDownItem" onClick={signOutUser}>
                    <img src={signOutIcon} className="dropDownItemIcon" alt="sign out icon"/>
                    <span className="dropDownItemText">SIGN OUT</span>
                </button>
            </div>
        </div>
    );
}

export default AccountDropDown;