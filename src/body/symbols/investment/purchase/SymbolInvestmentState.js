import {useState} from "react";
import {
    getInvestmentFromSymbol,
    getRemainingFunds,
    getUpcomingContests,
    placeBuyOrder,
    placeSellOrder
} from "../../../../service/contestService";

const SymbolInvestmentState = (symbol, populateOrderList, currentPrice) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState();
    const [orderAmount, setOrderAmount] = useState();
    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0);
    const [investmentReturns, setInvestmentReturns] = useState(0);
    const [activeContest, setActiveContest] = useState();
    const [operationType, setOperationType] = useState("BUY");

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
            setAmountInvested(userAmountInvested.data.amount);
            setInvestmentReturns(
                (currentPrice * userAmountInvested.data.amount - userAmountInvested.data.sumPaid).toFixed(2)
            );
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

export default SymbolInvestmentState;
