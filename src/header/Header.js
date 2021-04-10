import React from "react";
import {NavLink} from "react-router-dom";
import leaderboard from "../icons/podium.svg";
import stocks from "../icons/stock.svg";
import calendar from "../icons/calendar.svg";
import "./header.css";
import Authentication from "./Authentication";

const Header = ({signedIn, setSignedIn}) => {
    return (
        <header id="header">
            <span id="appTitle">STOCK COMP</span>
            <nav id="navigation">
                <NavLink to="/stocks" className="link">
                    <img src={stocks} className="headerIcon" alt="Symbol icon"/>
                    <span className="headerText">STOCKS</span>
                </NavLink>
                <NavLink to="/leaderboard" className="link">
                    <img src={leaderboard} className="headerIcon" alt="Leaderboard icon"/>
                    <span className="headerText">LEADERBOARD</span>
                </NavLink>
                <NavLink to="/contests" className="link">
                    <img src={calendar} className="headerIcon" alt="Calendar icon"/>
                    <span className="headerText">CONTESTS</span>
                </NavLink>
                <Authentication signedIn={signedIn} setSignedIn={setSignedIn}/>
            </nav>
        </header>
    );
};

export default Header;