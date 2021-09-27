import React from "react";
import Investment from "./Investment";

const InvestmentList = ({investments, renderInvestments}) => {

    if (renderInvestments) {
        return (
            <ul id="investmentList">
                {investments.map((investment) =>
                    <Investment investment={investment} key={investment.id}/>
                )}
            </ul>
        );
    } else {
        return null;
    }
}

export default InvestmentList;