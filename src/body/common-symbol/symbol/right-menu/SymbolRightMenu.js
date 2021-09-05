import InvestmentSymbol from "../investment-symbol/InvestmentSymbol";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import React, {useEffect} from "react";
import LoadingComponent from "../../../../util/LoadingComponent";
import SymbolRightMenuState from "./SymbolRightMenuState";

const SymbolRightMenu = () => {

    const {contests, isLoading, fetchUpcomingContests} = SymbolRightMenuState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div>
            <InvestmentSymbol/>
            <ActiveOrders/>
            <CompletedOrders/>
        </div>
    )
}

export default SymbolRightMenu;