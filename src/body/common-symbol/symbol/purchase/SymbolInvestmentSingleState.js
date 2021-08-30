import {useState} from "react";
import {
    getInvestmentFromSymbol,
    getRemainingFunds,
    getUpcomingContests,
    placeBuyOrder,
    placeSellOrder
} from "../../../../service/contestService";

const SymbolInvestmentSingleState = (symbol, populateOrderList, realTimePrice) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState();
    const [orderAmount, setOrderAmount] = useState();
    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0);
    const [investmentValue, setInvestmentValue] = useState(0);
    const [investmentProfit, setInvestmentProfit] = useState(0);
    const [activeContest, setActiveContest] = useState();
    const [operationType, setOperationType] = useState("BUY");

    const getUserParticipatingInActiveContest = (contests) => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }

    const fetchParticipantData = async () => {
        const contests = await getUpcomingContests();
        const activeContest = getUserParticipatingInActiveContest(contests.data);
        setActiveContest(activeContest);
        if (activeContest) {
            const userRemainingFunds = await getRemainingFunds(activeContest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            const investment = await getInvestmentFromSymbol(activeContest.contestNumber, symbol.symbol);
            setAmountInvested(investment.data.amount);
            setInvestmentValue(investment.data.totalValue.toFixed(2));
            setInvestmentProfit(investment.data.totalProfit.toFixed(2));
        }
    }

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            currency: realTimePrice.currency,
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
        fetchParticipantData, remainingFunds, amountInvested, investmentProfit, investmentValue,
        setOrderAmount, setAcceptedPrice, setExpirationTime, sendOrder, setOperationType
    }
}

export default SymbolInvestmentSingleState;
