import React, {useEffect} from "react";
import Search from "./search/Search";
import TrendingSymbols from "./trending/TrendingSymbols";
import UpcomingContests from "./upcoming-contests/UpcomingContests";
import SymbolsState from "./SymbolsState";
import SymbolInvestmentTotal from "./investment/SymbolInvestmentTotal";

const Symbols = () => {

    const {contestList, fetchUpcomingContests} = SymbolsState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    return (
        <div id="symbolsPage">
            <Search/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <div className="leftMenu" id="symbolsRightMenu">
                    <UpcomingContests constestList={contestList}/>
                    <SymbolInvestmentTotal contestList={contestList}/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
