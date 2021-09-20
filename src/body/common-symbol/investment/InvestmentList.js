import React from "react";
import Investment from "./Investment";

const InvestmentList = ({investments, renderInvestments}) => {

    if(renderInvestments) {
        return (
            <div id="investmentList">
                <ul>
                    {investments.map((investment) =>
                        <Investment investment={investment} key={investment.id}/>
                    )}
                </ul>
            </div>
        );
    } else {
        return null;
    }
}

export default InvestmentList;