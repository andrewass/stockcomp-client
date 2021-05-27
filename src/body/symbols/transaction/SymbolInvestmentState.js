import {useState} from "react";
import {getRemainingFunds, getUpcomingContests, getInvestmentFromSymbol} from "../../../service/contestService";

const SymbolInvestmentState = ({symbol}) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState();
    const [requestedAmount, setRequestedAmount] = useState();
    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0);

    const getUserParticipatingInActiveContest = (contests) => {
        return contests.find(contest => contest.userIsParticipating && contest.inRunningMode);
    }

    const fetchParticipantData = async () => {
        const contests = await getUpcomingContests();
        const activeContest = getUserParticipatingInActiveContest(contests.data);
        if (activeContest) {
            const userRemainingFunds = await getRemainingFunds(activeContest.contestNumber);
            setRemainingFunds(userRemainingFunds.data);
            const userAmountInvested = await getInvestmentFromSymbol(activeContest.contestNumber, symbol);
            setAmountInvested(userAmountInvested.data.amount);
        }
    }

    const updateRequestedAmount = (event) => {
        setExpirationTime(event.target.value);
    };

    const updateAcceptedPrice = (event) => {
        setExpirationTime(event.target.value);
    }

    const createInvestmentOrderRequest = () => {
        return {
            acceptedPrice: acceptedPrice,
            expirationTime: expirationTime,
            symbol: symbol,

        }
    }

    const placeSellOrder = () => {

    }

    const placeBuyOrder = () => {

    }

    return {
        fetchParticipantData, remainingFunds, amountInvested
    }


}

export default SymbolInvestmentState;
