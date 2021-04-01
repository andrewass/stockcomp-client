import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./header/Header";
import Body from "./body/Body";

const App = () => {

    const [signedIn, setSignedIn] = useState(localStorage.getItem("isSignedIn"));

    return (
        <div id="appBody">
            <Router>
                <Header signedIn={signedIn} setSignedIn={setSignedIn}/>
                <Body setSignedIn={setSignedIn}/>
            </Router>
        </div>
    );
};

export default App;
