import React, {useEffect} from "react";
import SymbolRightMenuState from "./SymbolRightMenuState";
import OrderSymbol from "./order-symbol/OrderSymbol";
import LoadingComponent from "../../../../util/LoadingComponent";
import InvestmentSymbol from "./investment-symbol/InvestmentSymbol";
import "./symbolRightMenu.css";

const SymbolRightMenu = ({symbol, currentPrice}) => {

    const {activeContest, fetchUpcomingContests, isLoading} = SymbolRightMenuState();

    useEffect(() => {
        fetchUpcomingContests().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="symbolRightMenu">
            <InvestmentSymbol contest={activeContest} symbol={symbol}/>
            <OrderSymbol contest={activeContest} symbol={symbol} currentPrice={currentPrice}/>
        </div>
    );
}

export default SymbolRightMenu;