import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import {useEffect} from "react";
import OrderTotalState from "./OrderTotalState";


const OrderTotal = ({contests}) => {

    const {populateOrderList, activeOrders, completedOrders} = OrderTotalState(contests);

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderTotal;