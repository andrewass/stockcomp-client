import {useState} from "react";
import {getRemainingFunds} from "../../../../../service/contestService";
import {getInvestmentOfSymbol} from "../../../../../service/investmentService";

const InvestmentSymbolState = (contest, symbol) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0);
    const [investmentValue, setInvestmentValue] = useState(0);
    const [investmentProfit, setInvestmentProfit] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchParticipantData = async () => {
        if (contest) {
            const userRemainingFunds = await getRemainingFunds(contest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            const investment = await getInvestmentOfSymbol(contest.contestNumber, symbol.symbol);
            setAmountInvested(investment.data.amount);
            setInvestmentValue(investment.data.totalValue.toFixed(2));
            setInvestmentProfit(investment.data.totalProfit.toFixed(2));
            setIsLoading(false);
        }
    }

    return {
        fetchParticipantData, remainingFunds, amountInvested, investmentProfit, investmentValue,
        isLoading, setIsLoading
    }
}

export default InvestmentSymbolState;
