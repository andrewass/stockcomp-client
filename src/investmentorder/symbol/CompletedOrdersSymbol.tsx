import {CompletedOrders} from "../CompletedOrders";
import {InvestmentOrder} from "../investmentOrderTypes";

interface Props {
    completedOrders: InvestmentOrder[]
}

export const CompletedOrdersSymbol = ({completedOrders}: Props) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}