import {InvestmentOrder} from "../../types/investmentorder";
import {CompletedOrders} from "../CompletedOrders";

interface Props {
    completedOrders: InvestmentOrder[]
}

export const CompletedOrdersSymbol = ({completedOrders}: Props) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}