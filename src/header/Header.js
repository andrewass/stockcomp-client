import React from "react";
import {NavLink} from "react-router-dom";
import Authentication from "./Authentication";

const Header = ({signedIn, setSignedIn}) => {
    return (
        <header>
            <nav className="navigationBar">
                <NavLink to="/contests" className="link">Contests</NavLink>
                <NavLink to="/problems" className="link">Problems</NavLink>
                <Authentication signedIn={signedIn} setSignedIn={setSignedIn}/>
            </nav>
        </header>
    );
};

export default Header;