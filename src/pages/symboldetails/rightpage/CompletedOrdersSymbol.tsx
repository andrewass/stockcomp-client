import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";
import {CompletedOrders} from "../../../investmentorder/CompletedOrders";


export const CompletedOrdersSymbol = ({completedOrders}: { completedOrders: InvestmentOrder[] }) => {
    return (
        <CompletedOrders completedOrders={completedOrders}/>
    );
}