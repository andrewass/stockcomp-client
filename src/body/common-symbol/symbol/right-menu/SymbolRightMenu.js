import React, {useEffect} from "react";
import SymbolRightMenuState from "./SymbolRightMenuState";
import OrderSymbol from "../order-symbol/OrderSymbol";
import LoadingComponent from "../../../../util/LoadingComponent";

const SymbolRightMenu = ({symbol}) => {

    const {contests, fetchUpcomingContests, isLoading} = SymbolRightMenuState();

    useEffect(() => {
        fetchUpcomingContests();
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div>
            <OrderSymbol contests={contests} symbol={symbol}/>
        </div>
    );
}

export default SymbolRightMenu;