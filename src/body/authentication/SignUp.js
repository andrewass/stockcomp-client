import React from "react";
import "./authentication.css";
import SignUpState from "./SignUpState";
import usernameIcon from "../../icons/user.svg";
import passwordIcon from "../../icons/padlock.svg";
import emailIcon from "../../icons/email.svg";

const SignUp = ({setDisplaySignUp}) => {

    const {
        postSignUpToServer, updateUsername, updatePassword,
        updateEmail, updateRetypedPassword, errorMessage
    } = SignUpState();

    const infoMessage = () => {
        return (
            <p className="outputMessages">
                {errorMessage}
            </p>
        );
    }

    return (
        <form onSubmit={postSignUpToServer} id="signUpForm">
            <p>STOCK COMP</p>
            <div className="username">
                <img src={usernameIcon} className="formIcon" alt="User icon"/>
                <input name="username" type="text" placeholder="username" onChange={updateUsername}/>
            </div>
            <div className="email">
                <img src={emailIcon} className="formIcon" alt="Email icon"/>
                <input name="email" type="email" placeholder="email address" onChange={updateEmail}/>
            </div>
            <div className="password">
                <img src={passwordIcon} className="formIcon" alt="Password icon"/>
                <input name="password" type="password" placeholder="password" onChange={updatePassword}/>
            </div>
            <div className="password">
                <img src={passwordIcon} className="formIcon" alt="Password icon"/>
                <input name="retypedPassword" type="password" placeholder="confirm password"
                       onChange={updateRetypedPassword}/>
            </div>
            <input type="submit" className="submit" value="Sign Up"/>
            <button onClick={() => setDisplaySignUp(false)}>Go to sign in</button>
        </form>
    );
};

export default SignUp;