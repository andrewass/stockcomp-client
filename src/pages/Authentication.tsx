import React, {useState} from "react";
import {SignUp} from "../components/authentication/SignUp";
import {SignIn} from "../components/authentication/SignIn";

const Authentication = () => {

    const [displaySignUp, setDisplaySignUp] = useState(false)

    if (displaySignUp) {
        return (
            <div id="authentication">
                <SignUp setDisplaySignUp={setDisplaySignUp} />
            </div>
        )
    } else {
        return (
            <div id="authentication">
                <SignIn setDisplaySignUp={setDisplaySignUp} />
            </div>
        )
    }
}

export default Authentication