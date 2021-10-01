import React, {useContext, useState} from "react";
import "./authentication.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";
import {signUp, updateLocalStorage} from "../../service/authService";

const SignUp = ({setDisplaySignUp}) => {

    const {setIsSignedIn} = useContext(UserContext);
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");

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

    const postSignUpToServer = async (event) => {
        event.preventDefault();
        if (matchingPasswords()) {
            await signUp(username, password, email)
            updateLocalStorage("true");
            setIsSignedIn(true);
            history.push("/stocks");
        } else {
            setPassword("");
            setRetypedPassword("");
        }
    };

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