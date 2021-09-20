import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {signIn, updateLocalStorage} from "../../service/authService";
import {UserContext} from "../../context/UserContext";


const SignInState = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {setIsSignedIn} = useContext(UserContext);
    const history = useHistory();

    const updateUsername = (event) => {
        setUsername(event.target.value);
    };

    const updatePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleErrorResponse = (response) => {
        if (response.status === 401) {
            setErrorMessage("Invalid credentials. Please verify username and password");
        } else {
            setErrorMessage("Unknown error occurred during sign in");
        }
    };

    const postSignInToServer = async (event) => {
        event.preventDefault();
        await signIn(username, password)
        updateLocalStorage("true");
        setIsSignedIn(true);
        history.push("/stocks");
    };

    return {
        updateUsername, updatePassword, postSignInToServer, errorMessage
    }
}

export default SignInState;
