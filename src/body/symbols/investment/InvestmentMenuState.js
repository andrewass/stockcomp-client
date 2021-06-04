import {useState} from "react";
import {
    getActiveOrdersParticipantSymbol, getCompletedOrdersParticipantSymbol
} from "../../../service/investmentOrderService";
import {getUpcomingContests} from "../../../service/contestService";

const InvestmentMenuState = ({symbol}) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const getContestNumberOfParticipatingContest = (contests) => {
        const contest =  contests.find(contest => contest.userIsParticipating && contest.inRunningMode);
        if(contest){
            return contest.contestNumber;
        }
    }

    const populateOrderList = async () => {
        const contests = await getUpcomingContests();
        const contestNumber = getContestNumberOfParticipatingContest(contests.data);
        if(contestNumber) {
            const activeOrderSymbolResponse = await getActiveOrdersParticipantSymbol(contestNumber, symbol);
            const completedOrderSymbolResponse = await getCompletedOrdersParticipantSymbol(contestNumber, symbol);
            setActiveOrders(activeOrderSymbolResponse.data);
            setCompletedOrders(completedOrderSymbolResponse.data);
        }
    }

    return {
        populateOrderList, activeOrders, completedOrders
    }
}

export default InvestmentMenuState;