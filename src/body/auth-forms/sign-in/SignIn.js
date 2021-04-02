import React from "react";
import "../authForm.css";
import SignInState from "./SignInState";
import {NavLink} from "react-router-dom";
import usernameIcon from "../../../icons/user.svg";
import passwordIcon from "../../../icons/padlock.svg";

const SignIn = ({setSignedIn}) => {

    const {updateUsername, updatePassword, postSignInToServer} = SignInState(setSignedIn);

    return (
        <div id="signInBox">
            <p>STOCK COMP</p>
            <form onSubmit={postSignInToServer} id="signInForm">
                <div className="username">
                    <img src={usernameIcon} className="formIcon"/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="password">
                    <img src={passwordIcon} className="formIcon" />
                    <input name="password" type="password" placeholder="password"
                           onChange={updatePassword}/>
                </div>
                <input type="submit" value="Sign In" className="submit"/>
            </form>
            <NavLink to="/sign-up" className="link">Create new account</NavLink>
        </div>
    );
};

export default SignIn;