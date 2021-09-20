import {signOut, updateLocalStorage} from "../service/authService";
import {UserContext} from "../context/UserContext";
import {useContext} from "react";

const AccountDropDownState = () => {

    const {setIsSignedIn} = useContext(UserContext);

    const signOutUser = async () => {
        await signOut()
        setIsSignedIn(false);
        updateLocalStorage("false");
    };

    return{
        signOutUser
    }
}

export default AccountDropDownState;