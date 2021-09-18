import React from "react";
import "./authentication.css";
import SignInState from "./SignInState";
import usernameIcon from "../../icons/user.svg";
import passwordIcon from "../../icons/padlock.svg";

const SignIn = ({setDisplaySignUp}) => {

    const {updateUsername, updatePassword, postSignInToServer} = SignInState();

    return (
        <form onSubmit={postSignInToServer} id="signInForm">
            <h1>STOCK COMP</h1>
            <div className="formFields">
                <div className="username">
                    <img src={usernameIcon} className="formIcon" alt="User Icon"/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="password">
                    <img src={passwordIcon} className="formIcon" alt="Password Icon"/>
                    <input name="password" type="password" placeholder="password"
                           autoComplete="off" onChange={updatePassword}/>
                </div>
            </div>
            <input type="submit" value="Sign In" className="submit"/>
            <button onClick={() => setDisplaySignUp(true)}>Go to sign up</button>
        </form>
    );
};

export default SignIn;