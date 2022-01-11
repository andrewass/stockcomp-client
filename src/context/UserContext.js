import React, {useState} from "react";

export const UserContext = React.createContext(undefined);

const UserProvider = (props) => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    return(
        <UserContext.Provider value={{isSignedIn, setIsSignedIn}} >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;
