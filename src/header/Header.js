import React from "react";
import {NavLink} from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EventIcon from '@mui/icons-material/Event';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import "./header.css";
import AccountDropDown from "./AccountDropDown";

const Header = () => {

    return (
        <header id="header">
            <span id="appTitle">STOCK COMP</span>
            <nav id="navigationBar">
                <NavLink to="/stocks" className="navItem">
                    <ShowChartIcon />
                    <span className="headerText">STOCKS</span>
                </NavLink>
                <NavLink to="/leaderboard" className="navItem">
                    <LeaderboardIcon />
                    <span className="headerText">LEADERBOARD</span>
                </NavLink>
                <NavLink to="/contests" className="navItem">
                    <EventIcon />
                    <span className="headerText">CONTESTS</span>
                </NavLink>
                <AccountDropDown />
            </nav>
        </header>
    );
};

export default Header;
