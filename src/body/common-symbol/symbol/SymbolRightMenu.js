import InvestmentSingle from "./investment-single/InvestmentSingle";
import Transaction from "./Transaction";
import ActiveOrders from "../order/ActiveOrders";
import CompletedOrders from "../order/CompletedOrders";

const SymbolRightMenu = () => {

    return (
        <div>
            <InvestmentSingle/>
            <Transaction/>
            <ActiveOrders/>
            <CompletedOrders/>
        </div>
    )
}

export default SymbolRightMenu;