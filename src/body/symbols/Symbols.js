import React from "react";
import Search from "./search/Search";
import TrendingSymbols from "../trending/TrendingSymbols";
import UpcomingContests from "./upcoming-contests/UpcomingContests";

const Symbols = () => {

    return (
        <div id="symbolsPage">
            <Search/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <UpcomingContests/>
            </div>
        </div>
    );
};

export default Symbols;
