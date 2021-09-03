import React, {useEffect} from "react";
import Search from "../search/Search";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import SymbolsState from "./SymbolsState";
import PortfolioStatus from "./portfolio-status/PortfolioStatus";
import Header from "../../../header/Header";
import OrderTotal from "./order-total/OrderTotal";
import InvestmentTotal from "./investment-total/InvestmentTotal";
import LoadingComponent from "../../../util/LoadingComponent";

const Symbols = () => {

    const {contests, isLoading, fetchUpcomingContests} = SymbolsState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="symbolsPage">
            <Header/>
            <Search/>
            <div id="symbolsBody">
                <TrendingSymbols/>
                <div className="rightMenu" id="symbolsRightMenu">
                    <ContestStatus contests={contests}/>
                    <PortfolioStatus contests={contests}/>
                    <OrderTotal contests={contests}/>
                    <InvestmentTotal contests={contests}/>
                </div>
            </div>
        </div>
    );
};

export default Symbols;
