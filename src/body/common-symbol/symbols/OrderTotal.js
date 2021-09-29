import ActiveOrders from "../order/ActiveOrders";
import CompletedOrders from "../order/CompletedOrders";
import {useEffect, useState} from "react";
import {getActiveOrdersParticipant, getCompletedOrdersParticipant} from "../../../service/investmentOrderService";


const OrderTotal = ({contestNumber}) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);


    const getActiveOrders = async () => {
        const response = await getActiveOrdersParticipant(contestNumber);
        setActiveOrders(response.data);
    }

    const getCompletedOrders = async () => {
        const response = await getCompletedOrdersParticipant(contestNumber);
        setCompletedOrders(response.data);
    }


    useEffect(() => {
        (async () => {
            if (contestNumber) {
                console.log("Fetching orders");
                await getActiveOrders();
                await getCompletedOrders();
            }
        })()
    }, []);

    return (
        <div>
            <ActiveOrders activeOrders={activeOrders} getActiveOrders={getActiveOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderTotal;