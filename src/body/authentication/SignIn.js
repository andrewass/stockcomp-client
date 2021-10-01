import React from "react";
import "./authentication.css";
import SignInState from "./SignInState";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const SignIn = ({setDisplaySignUp}) => {

    const {updateUsername, updatePassword, postSignInToServer} = SignInState();

    return (
        <form onSubmit={postSignInToServer} id="signInForm">
            <h1>STOCK COMP</h1>
            <div className="formFields">
                <div className="username">
                    <AccountCircleIcon/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="password">
                    <LockIcon/>
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