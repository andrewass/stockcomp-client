import React, {useEffect, useState} from "react";
import LoadingComponent from "../../../../util/LoadingComponent";
import Investment from "../../investment/Investment";
import {getRemainingFunds} from "../../../../service/contestService";
import {getInvestmentOfSymbol} from "../../../../service/investmentService";

const InvestmentSymbol = ({contest, symbol}) => {

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


    const displayInvestment = () => {
        return investment ? <Investment investment={investment}/> : null;
    }


    useEffect(() => {
        fetchParticipantData().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    else {
        return (
            <div>
                <h2>Portfolio Status</h2>
                <p>Remaining funds : {remainingFunds}</p>
                {displayInvestment()}
            </div>
        );
    }
}

export default InvestmentSymbol;