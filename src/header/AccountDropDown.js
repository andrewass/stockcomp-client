import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import "./header.css";
import {UserContext} from "../context/UserContext";
import {signOut, updateLocalStorage} from "../service/authService";


const AccountDropDown = () => {

    const {setIsSignedIn} = useContext(UserContext);

    const signOutUser = async () => {
        await signOut()
        setIsSignedIn(false);
        updateLocalStorage("false");
    };

    return (
        <div id="accountDropDown">
            <button id="dropDownButton">
                <SettingsIcon />
                <span className="headerText">SETTINGS</span>
            </button>
            <div id="dropDownItems">
                <NavLink to="/account" className="dropDownItem">
                    <AccountCircleIcon />
                    <span className="dropDownItemText">ACCOUNT</span>
                </NavLink>
                <button className="dropDownItem" onClick={signOutUser}>
                    <LogoutIcon />
                    <span className="dropDownItemText">SIGN OUT</span>
                </button>
            </div>
        </div>
    );
}

export default AccountDropDown;