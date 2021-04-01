import {useState} from "react";
import {useHistory} from "react-router-dom";
import authService from "../../service/authService";


const SignInState = (setSignedIn) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
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

    const postSignInToServer = (event) => {
        event.preventDefault();
        authService.signIn(username, password)
            .then(() => {
                authService.updateLocalStorage(username, "true");
                setSignedIn(true);
                history.push("/problems");
            }).catch((error) => handleErrorResponse(error.response));
    };

    return {
        updateUsername, updatePassword, postSignInToServer, errorMessage
    }
}

export default SignInState;
