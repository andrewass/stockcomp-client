import {useState} from "react";
import {getActiveOrdersParticipant, getCompletedOrdersParticipant} from "../../../../service/investmentOrderService";


const OrderTotalState = (contests) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const getContestNumberOfParticipatingContest = () => {
        const contest = contests.find(contest => contest.userParticipating && contest.running);
        if (contest) {
            return contest.contestNumber;
        }
    }

    const populateOrderList = async () => {
        const contestNumber = getContestNumberOfParticipatingContest();
        if (contestNumber) {
            const activeOrderSymbolResponse = await getActiveOrdersParticipant(contestNumber);
            const completedOrderSymbolResponse = await getCompletedOrdersParticipant(contestNumber);
            setActiveOrders(activeOrderSymbolResponse.data);
            setCompletedOrders(completedOrderSymbolResponse.data);
        }
    }

    return {
        populateOrderList, activeOrders, completedOrders
    }
}

export default OrderTotalState;