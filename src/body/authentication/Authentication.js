import React, {useState} from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


const Authentication = () => {

    const [displaySignUp, setDisplaySignUp] = useState(false);

    if (displaySignUp) {
        return (
            <div id="authentication">
                <SignUp setDisplaySignUp={setDisplaySignUp} />
            </div>
        );
    } else {
        return (
            <div id="authentication">
                <SignIn setDisplaySignUp={setDisplaySignUp} />
            </div>
        );
    }
}

export default Authentication;