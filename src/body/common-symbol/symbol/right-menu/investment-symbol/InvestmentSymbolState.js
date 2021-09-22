import {useState} from "react";
import {getRemainingFunds} from "../../../../../service/contestService";
import {getInvestmentOfSymbol} from "../../../../../service/investmentService";

const InvestmentSymbolState = (contest, symbol) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [investment, setInvestment] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchParticipantData = async () => {
        if (contest) {
            const userRemainingFunds = await getRemainingFunds(contest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            const investmentResponse = await getInvestmentOfSymbol(contest.contestNumber, symbol.symbol);
            if (investmentResponse.data) {
                setInvestment(investmentResponse.data)
            }
            setIsLoading(false);
        }
    }

    return {
        fetchParticipantData, remainingFunds, investment, isLoading, setIsLoading
    }
}

export default InvestmentSymbolState;
