import React, {useContext, useState} from "react";
import "./authentication.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import {signIn, updateLocalStorage} from "../../service/authService";
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router-dom";

const SignIn = ({setDisplaySignUp}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setIsSignedIn} = useContext(UserContext);
    const history = useHistory();

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const postSignInToServer = async (event) => {
        event.preventDefault();
        let response = await signIn(username, password);
        updateLocalStorage("true");
        setIsSignedIn(true);
        (response.data === 'ADMIN') ? history.push("/admin") : history.push("/stocks");
    }

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