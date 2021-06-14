import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./header/Header";
import Body from "./body/Body";
import SymbolProvider from "./context/SymbolContext";
import UserProvider from "./context/UserContext";
import responseInterceptor from "./service/interceptor";

const App = () => {

    return (
        <div id="appBody">
            <Router>
                <UserProvider>
                    <Header/>
                    <SymbolProvider>
                        <Body/>
                    </SymbolProvider>
                </UserProvider>
            </Router>
        </div>
    );
};

export default App;
