import {CompletedOrders} from "../CompletedOrders";
import {InvestmentOrder} from "../investmentOrderTypes";


export const CompletedOrdersSymbol = ({completedOrders}: { completedOrders: InvestmentOrder[] }) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}