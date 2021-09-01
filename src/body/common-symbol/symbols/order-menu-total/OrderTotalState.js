import {useState} from "react";
import {getUpcomingContests} from "../../../../service/contestService";
import {getActiveOrdersParticipant, getCompletedOrdersParticipant} from "../../../../service/investmentOrderService";


const OrderTotalState = () => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const getContestNumberOfParticipatingContest = (contests) => {
        const contest = contests.find(contest => contest.userParticipating && contest.running);
        if (contest) {
            return contest.contestNumber;
        }
    }

    const populateOrderList = async () => {
        const contests = await getUpcomingContests();
        const contestNumber = getContestNumberOfParticipatingContest(contests.data);
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