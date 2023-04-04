import {CompletedOrders} from "../CompletedOrders";
import {InvestmentOrder} from "../investmentOrderTypes";


export const CompletedOrdersTotal = ({completedOrders}: { completedOrders: InvestmentOrder[] }) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}