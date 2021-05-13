import {useState} from "react";
import {getRemainingFunds, getUpcomingContests} from "../../../service/contestService";

const TransactionState = (symbol) => {

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
            const userAmountInvested = 2000;
            setAmountInvested(userAmountInvested);
        }
    }

    return {
        fetchParticipantData, remainingFunds, amountInvested
    }
}

export default TransactionState;
