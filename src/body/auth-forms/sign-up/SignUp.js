import React from "react";
import "../authForm.css";
import SignUpState from "./SignUpState";
import usernameIcon from "../../../icons/user.svg";
import passwordIcon from "../../../icons/padlock.svg";
import emailIcon from "../../../icons/email.svg";

const SignUp = ({setSignedIn}) => {

    const {
        postSignUpToServer, updateUsername, updatePassword,
        updateEmail, updateRetypedPassword
    } = SignUpState(setSignedIn);

    return (
        <div id="signUpBox">
            <form onSubmit={postSignUpToServer} id="signUpForm">
                <p>STOCK COMP</p>
                <div className="username">
                    <img src={usernameIcon} className="formIcon"/>
                    <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
                </div>
                <div className="email">
                    <img src={emailIcon} className="formIcon"/>
                    <input name="email" type="email" placeholder="email address" onChange={updateEmail}/>
                </div>
                <div className="password">
                    <img src={passwordIcon} className="formIcon"/>
                    <input name="password" type="password" placeholder="password" onChange={updatePassword}/>
                </div>
                <div className="password">
                    <img src={passwordIcon} className="formIcon"/>
                    <input name="retypedPassword" type="password" placeholder="confirm password"
                           onChange={updateRetypedPassword}/>
                </div>
                <input type="submit" className="submit" value="Sign Up"/>
            </form>
        </div>
    );
};

export default SignUp;