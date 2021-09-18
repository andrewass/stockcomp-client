import React from "react";
import {NavLink} from "react-router-dom";
import leaderboard from "../icons/podium.svg";
import stocks from "../icons/stock.svg";
import calendar from "../icons/calendar.svg";
import "./header.css";
import AccountDropDown from "./AccountDropDown";

const Header = () => {

    return (
        <header id="header">
            <span id="appTitle">STOCK COMP</span>
            <nav id="navigationBar">
                <NavLink to="/stocks" className="navItem">
                    <img src={stocks} className="headerIcon" alt="Symbol icon"/>
                    <span className="headerText">STOCKS</span>
                </NavLink>
                <NavLink to="/leaderboard" className="navItem">
                    <img src={leaderboard} className="headerIcon" alt="Leaderboard icon"/>
                    <span className="headerText">LEADERBOARD</span>
                </NavLink>
                <NavLink to="/contests" className="navItem">
                    <img src={calendar} className="headerIcon" alt="Calendar icon"/>
                    <span className="headerText">CONTESTS</span>
                </NavLink>
                <AccountDropDown />
            </nav>
        </header>
    );
};

export default Header;
