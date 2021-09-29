import ActiveOrders from "../order/ActiveOrders";
import CompletedOrders from "../order/CompletedOrders";
import {useEffect, useState} from "react";
import {getActiveOrdersParticipant, getCompletedOrdersParticipant} from "../../../service/investmentOrderService";


const OrderTotal = ({contest}) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const getActiveOrders = async () => {
        const response = await getActiveOrdersParticipant(contest.contestNumber);
        setActiveOrders(response.data);
    }

    const getCompletedOrders = async () => {
        const response = await getCompletedOrdersParticipant(contest.contestNumber);
        setCompletedOrders(response.data);
    }

    useEffect(() => {
        if (contest) {
            getActiveOrders().catch(error => console.log(error));
            getCompletedOrders().catch(error => console.log(error));
        }
    }, []);

    return (
        <div>
            <ActiveOrders activeOrders={activeOrders} getActiveOrders={getActiveOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderTotal;