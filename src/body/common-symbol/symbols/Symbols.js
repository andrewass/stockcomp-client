import React, {useEffect} from "react";
import Search from "../search/Search";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import SymbolsState from "./SymbolsState";
import InvestmentTotal from "./investment-total/InvestmentTotal";
import Header from "../../../header/Header";
import OrderMenuTotal from "./order-menu-total/OrderTotal";

const Symbols = () => {

    const {contestList, fetchUpcomingContests} = SymbolsState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    return (
        <div id="symbolsPage">
            <Header/>
            <Search/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <div className="rightMenu" id="symbolsRightMenu">
                    <ContestStatus constestList={contestList}/>
                    <InvestmentTotal contestList={contestList}/>
                    <OrderMenuTotal/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
