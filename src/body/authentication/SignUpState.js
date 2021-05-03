import {useContext, useState} from "react";
import {signUp, updateLocalStorage} from "../../service/authService";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

const SignUpState = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const {setIsSignedIn} = useContext(UserContext);
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
            signUp(username, password, email)
                .then(() => {
                    updateLocalStorage("true");
                    setIsSignedIn(true);
                    history.push("/stocks");
                }).catch((error) => setErrorMessage("Unknown error occurred during sign up : " + error));
        } else {
            setErrorMessage("Mismatch between passwords! Please try again");
            setPassword("");
            setRetypedPassword("");
        }
    };

    return {
        updateUsername, updatePassword, updateRetypedPassword, updateEmail, postSignUpToServer, errorMessage
    }
}

export default SignUpState;
