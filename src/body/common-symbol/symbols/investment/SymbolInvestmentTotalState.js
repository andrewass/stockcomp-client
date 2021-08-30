import {useState} from "react";
import {getRemainingFunds, getTotalValueInvestments} from "../../../../service/contestService";

const SymbolInvestmentTotalState = (contests) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [totalValueInvestments, setTotalValueInvestments] = useState();
    const [totalValue, setTotalValue] = useState();

    const getUserParticipatingInActiveContest = () => {
        return contests.find(contest => contest.userParticipating && contest.running);
    }

    const fetchParticipantData = async (contestList) => {
        const activeContest = await getUserParticipatingInActiveContest(contestList);
        if (activeContest) {
            const userRemainingFunds = await getRemainingFunds(activeContest.contestNumber);
            const userTotalValueInvestments = await getTotalValueInvestments(activeContest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            setTotalValueInvestments(userTotalValueInvestments.data.toFixed(2));
            setTotalValue((userRemainingFunds.data + userTotalValueInvestments.data).toFixed(2));
        }
    }

    return {
        fetchParticipantData, remainingFunds, totalValueInvestments, totalValue
    }
}

export default SymbolInvestmentTotalState;
