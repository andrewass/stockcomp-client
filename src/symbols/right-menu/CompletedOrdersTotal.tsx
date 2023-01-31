import {InvestmentOrder} from "../../types/investmentorder";
import {CompletedOrders} from "../../investmentorder/CompletedOrders";


interface Props {
    completedOrders: InvestmentOrder[]
}

export const CompletedOrdersTotal = ({completedOrders}: Props) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}