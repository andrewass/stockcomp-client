import InvestmentSymbol from "../investment-symbol/InvestmentSymbol";
import React, {useEffect} from "react";
import SymbolRightMenuState from "./SymbolRightMenuState";
import OrderSymbol from "../order-symbol/OrderSymbol";

const SymbolRightMenu = ({symbol}) => {

    const {contests, fetchUpcomingContests} = SymbolRightMenuState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    if (true) {
        return (
            <div>
                <OrderSymbol contests={contests} symbol={symbol}/>
            </div>
        );
    }
    return (
        <div>
            <InvestmentSymbol contests={contests}/>
        </div>
    )
}

export default SymbolRightMenu;