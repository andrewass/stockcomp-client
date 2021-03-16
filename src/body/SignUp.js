import React, {useState} from "react";
import authService from "../service/authService";
import {useHistory} from "react-router-dom";

const SignUp = ({setSignedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const matchingPasswords = () => {
        return password.length > 0 && password === retypedPassword;
    };

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const updateRetypedPassword = (event) => {
        setRetypedPassword(event.target.value);
    };

    const updateEmail = (event) => {
        setEmail(event.target.value);
    };

    const postSignUpToServer = (event) => {
        event.preventDefault();
        if (matchingPasswords()) {
            let result = authService.signUp(username, password, email);
            result.then((response) => {
                authService.updateLocalStorage(response.data.username, response.data.jwt);
                setSignedIn(true);
                history.push("/problems");
            }).catch((error) => setErrorMessage("Unknown error occurred during sign in : "+error));
        } else {
            setErrorMessage("Mismatch between passwords! Please try again");
            setPassword("");
            setRetypedPassword("");
        }
    };

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