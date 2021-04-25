import React from "react";
import "./authentication.css";
import SignInState from "./SignInState";
import {NavLink} from "react-router-dom";
import usernameIcon from "../../icons/user.svg";
import passwordIcon from "../../icons/padlock.svg";

const SignIn = () => {

    const {updateUsername, updatePassword, postSignInToServer} = SignInState();

    return (
        <div id="signInBox">
            <p>STOCK COMP</p>
            <form onSubmit={postSignInToServer} id="signInForm">
                <div className="username">
                    <img src={usernameIcon} className="formIcon" alt="User Icon"/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="password">
                    <img src={passwordIcon} className="formIcon" alt="Password Icon"/>
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