import {createContext, useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {GET_SIGNED_IN_USER, getSignedInUserConfig} from "./api/authorizationApi";
import {SignedInUser} from "./authTypes";
import {useApiWrapper} from "../config/useApiWrapper";

const emptyUser: SignedInUser = {name: "EmptyUser"}

export const AuthContext = createContext({
    user: emptyUser
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<SignedInUser>(emptyUser);

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: userData} = useQuery<SignedInUser>(
        [GET_SIGNED_IN_USER],
        () => apiGet(getSignedInUserConfig())
    );

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );
}
