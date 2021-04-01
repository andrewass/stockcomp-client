import React from "react";
import "./signIn.css";
import SignInState from "./SignInState";
import {NavLink} from "react-router-dom";

const SignIn = ({setSignedIn}) => {

    const {updateUsername, updatePassword, postSignInToServer} = SignInState(setSignedIn);

    return (
        <div id="signInBox">
            <p>STOCK COMP</p>
            <form onSubmit={postSignInToServer} id="signInForm">
                <span>SIGN IN</span>
                <input name="username" type="text" placeholder="Your username" onChange={updateUsername}/>
                <input name="password" type="password" placeholder="Your password" onChange={updatePassword}/>
                <input type="submit" value="Submit"/>
            </form>
            <NavLink to="/sign-up" className="link">Create new account</NavLink>
        </div>
    );
};

export default SignIn;