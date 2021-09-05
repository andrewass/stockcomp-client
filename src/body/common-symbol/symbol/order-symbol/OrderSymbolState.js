import {useState} from "react";
import {
    getActiveOrdersParticipantSymbol,
    getCompletedOrdersParticipantSymbol
} from "../../../../service/investmentOrderService";


const OrderSymbolState = (contests, symbol) => {

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
            const activeOrderSymbolResponse = await getActiveOrdersParticipantSymbol(contestNumber, symbol.symbol);
            const completedOrderSymbolResponse = await getCompletedOrdersParticipantSymbol(contestNumber, symbol.symbol);
            setActiveOrders(activeOrderSymbolResponse.data);
            setCompletedOrders(completedOrderSymbolResponse.data);
        }
    }

    return {
        populateOrderList, activeOrders, completedOrders
    }
}

export default OrderSymbolState;