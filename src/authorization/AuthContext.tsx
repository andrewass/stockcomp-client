import {createContext, useContext, useState} from "react";
import {SignedInUser} from "./authTypes";
import {useApiWrapper} from "../config/useApiWrapper";
import {AuthProviderSelection} from "./AuthProviderSelection";

const emptyUser: SignedInUser = {name: "EmptyUser"}

export const AuthContext = createContext({
    user: emptyUser
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<SignedInUser>(emptyUser);

    const {apiGet} = useApiWrapper();


    return (
        <AuthContext.Provider value={{user}}>
            <AuthProviderSelection/>
        </AuthContext.Provider>
    );
}
