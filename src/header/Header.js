import React from "react";
import {NavLink} from "react-router-dom";
import leaderboard from "../icons/podium.svg";
import stocks from "../icons/stock.svg";
import calendar from "../icons/calendar.svg";
import "./header.css";
import Authentication from "./Authentication";

const Header = () => {

    return (
        <header id="header">
            <nav id="navigation">
                <NavLink to="/home" className="link">
                    <span id="appTitle">STOCK COMP</span>
                </NavLink>
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
                <Authentication />
            </nav>
        </header>
    );
};

export default Header;
