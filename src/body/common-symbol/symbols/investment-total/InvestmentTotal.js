import React, {useEffect} from "react";
import InvestmentTotalState from "./InvestmentTotalState";
import Investments from "../../investment/Investments";


const InvestmentTotal = ({contests}) => {

    const {investments, populateInvestmentList} = InvestmentTotalState(contests);

    useEffect(() => {
        populateInvestmentList()
            .catch(error => console.log(error));
    }, []);

    return (
        <Investments investments={investments}/>
    );
}

export default InvestmentTotal;