import React from "react";
import SignUpState from "./SignUpState";

const SignUp = ({setSignedIn}) => {

    const {
        postSignUpToServer, updateUsername, updatePassword,
        updateEmail, updateRetypedPassword, errorMessage
    } = SignUpState(setSignedIn);

    return (
        <div className="signUpBlock">
            <form onSubmit={postSignUpToServer} className="signUpForm">
                <span>Sign Up</span>
                <input name="username" type="text" placeholder="Your username" onChange={updateUsername}/>
                <input name="email" type="email" placeholder="Your email address" onChange={updateEmail}/>
                <input name="password" type="password" placeholder="Your password" onChange={updatePassword}/>
                <input name="retypedPassword" type="password" placeholder="Retype password"
                       onChange={updateRetypedPassword}/>
                <input type="submit" value="Submit"/>
            </form>
            <span className="errorMessage">{errorMessage}</span>
        </div>
    );
};

export default SignUp;