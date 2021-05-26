import {useState} from "react";
import {getRemainingFunds, getUpcomingContests, getInvestmentFromSymbol} from "../../../service/contestService";

const TransactionMenuState = ({symbol}) => {

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

    return {
        fetchParticipantData, remainingFunds, amountInvested
    }
}

export default TransactionMenuState;
