import React, {useEffect} from "react";
import InvestmentTotalState from "./InvestmentTotalState";
import Investment from "./Investment";


const InvestmentTotal = ({contests}) => {

    const {investments, populateInvestmentList} = InvestmentTotalState(contests);

    useEffect(() => {
        populateInvestmentList()
            .catch(error => console.log(error));
    }, []);

    return (
        <div id="investmentList">
            <h3>Investments : </h3>
            <ul>
                {investments.map((investment) =>
                    <Investment investment={investment} key={investment.id}/>
                )}
            </ul>
        </div>
    );
}

export default InvestmentTotal;