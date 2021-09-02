import React, {useEffect} from "react";
import Search from "../search/Search";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import SymbolsState from "./SymbolsState";
import PortfolioStatus from "./portfolio-status/PortfolioStatus";
import Header from "../../../header/Header";
import OrderMenuTotal from "./order-total/OrderTotal";
import InvestmentTotal from "./investment-total/InvestmentTotal";

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
                    <PortfolioStatus contestList={contestList}/>
                    <OrderMenuTotal/>
                    <InvestmentTotal/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
