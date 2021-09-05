import React, {useEffect} from "react";
import InvestmentTotalState from "./InvestmentTotalState";
import InvestmentList from "../../investment/InvestmentList";


const InvestmentTotal = ({contests}) => {

    const {investments, populateInvestmentList} = InvestmentTotalState(contests);

    useEffect(() => {
        populateInvestmentList()
            .catch(error => console.log(error));
    }, []);

    return (
        <InvestmentList investments={investments}/>
    );
}

export default InvestmentTotal;