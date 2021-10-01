import React from "react";
import "./authentication.css";
import SignUpState from "./SignUpState";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

const SignUp = ({setDisplaySignUp}) => {

    const {
        postSignUpToServer, updateUsername, updatePassword,
        updateEmail, updateRetypedPassword
    } = SignUpState();

    return (
        <form onSubmit={postSignUpToServer} id="signUpForm">
            <h1>STOCK COMP</h1>
            <div className="formFields">
                <div className="username">
                    <AccountCircleIcon/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="email">
                    <EmailIcon/>
                    <input name="email" type="email" placeholder="email address" onChange={updateEmail}/>
                </div>
                <div className="password">
                    <LockIcon/>
                    <input name="password" type="password" placeholder="password" onChange={updatePassword}/>
                </div>
                <div className="password">
                    <LockIcon/>
                    <input name="retypedPassword" type="password" placeholder="confirm password"
                           onChange={updateRetypedPassword}/>
                </div>
            </div>
            <input type="submit" className="submit" value="Sign Up"/>
            <button onClick={() => setDisplaySignUp(false)}>Go to sign in</button>
        </form>
    );
};

export default SignUp;