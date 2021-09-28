import React, {useEffect} from "react";
import TrendingSymbols from "./trending/TrendingSymbols";
import ContestStatus from "./contest-status/ContestStatus";
import SymbolsState from "./SymbolsState";
import PortfolioStatus from "./portfolio-status/PortfolioStatus";
import OrderTotal from "./order-total/OrderTotal";
import InvestmentTotal from "./investment-total/InvestmentTotal";
import LoadingComponent from "../../../util/LoadingComponent";
import SearchBar from "../search/SearchBar";
import "./symbols.css";


const Symbols = () => {

    const {contests, isLoading, fetchUpcomingContests} = SymbolsState();

    useEffect(() => {
        fetchUpcomingContests().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="symbolsPage">
            <SearchBar/>
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
