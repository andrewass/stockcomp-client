import React, {useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./header/Header";
import Body from "./body/Body";
import SymbolProvider from "./context/SymbolContext";

const App = () => {

    const [signedIn, setSignedIn] = useState(localStorage.getItem("isSignedIn"));

    return (
        <div id="appBody">
            <Router>
                <Header signedIn={signedIn} setSignedIn={setSignedIn}/>
                <SymbolProvider>
                    <Body setSignedIn={setSignedIn}/>
                </SymbolProvider>
            </Router>
        </div>
    );
};

export default App;
