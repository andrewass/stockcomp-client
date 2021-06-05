import {useState} from "react";
import {
    getInvestmentFromSymbol,
    getRemainingFunds,
    getUpcomingContests,
    placeBuyOrder,
    placeSellOrder
} from "../../../../service/contestService";

const SymbolInvestmentTotalState = (symbol, populateOrderList, currentPrice) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [investmentReturns, setInvestmentReturns] = useState(0);
    const [activeContest, setActiveContest] = useState();

    const getUserParticipatingInActiveContest = (contests) => {
        return contests.find(contest => contest.userIsParticipating && contest.inRunningMode);
    }

    const fetchParticipantData = async () => {
        const contests = await getUpcomingContests();
        const activeContest = getUserParticipatingInActiveContest(contests.data);
        setActiveContest(activeContest);
        if (activeContest) {
            const userRemainingFunds = await getRemainingFunds(activeContest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            const userAmountInvested = await getInvestmentFromSymbol(activeContest.contestNumber, symbol.symbol);
        }
    }

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            symbol: symbol.symbol,
            amount: parseInt(orderAmount),
            contestNumber: activeContest.contestNumber,
        }
    }

    const sendOrder = async () => {
        operationType === "BUY"
            ? await placeBuyOrder(createInvestmentOrderRequest())
            : await placeSellOrder(createInvestmentOrderRequest());
        await populateOrderList();
    }

    return {
        fetchParticipantData, remainingFunds, amountInvested, investmentReturns,
        setOrderAmount, setAcceptedPrice, setExpirationTime, sendOrder, setOperationType
    }
}

export default SymbolInvestmentSingleState;
