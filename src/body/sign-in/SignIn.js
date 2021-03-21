import React from "react";
import SignInState from "./SignInState";

const SignIn = ({setSignedIn}) => {

    const {errorMessage, updateUsername, updatePassword, postSignInToServer} = SignInState(setSignedIn);

    return (
        <div className="signInBlock">
            <form onSubmit={postSignInToServer} className="signInForm">
                <span>Sign In</span>
                <input name="username" type="text" placeholder="Your username" onChange={updateUsername}/>
                <input name="password" type="password" placeholder="Your password" onChange={updatePassword}/>
                <input type="submit" value="Submit"/>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
};

export default SignIn;