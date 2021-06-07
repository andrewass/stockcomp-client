import React from "react";
import Search from "./search/Search";
import TrendingSymbols from "./trending/TrendingSymbols";
import UpcomingContests from "./upcoming-contests/UpcomingContests";
import InvestmentMenuTotal from "./investment/InvestmentMenuTotal";

const Symbols = () => {

    return (
        <div id="symbolsPage">
            <Search/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <div className="leftMenu" id="symbolsRightMenu">
                    <UpcomingContests/>
                    <InvestmentMenuTotal/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
