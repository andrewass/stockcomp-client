import {signOut, updateLocalStorage} from "../service/authService";
import {UserContext} from "../context/UserContext";
import {useContext} from "react";

const AuthenticationState = () => {

    const {isSignedIn, setIsSignedIn} = useContext(UserContext);

    const signOutUser = () => {
        signOut()
            .then(() => {
                setIsSignedIn(false);
                updateLocalStorage("false");
            }).catch((error) => console.log(error));
    };

    return{
        signOutUser, isSignedIn
    }
}

export default AuthenticationState;