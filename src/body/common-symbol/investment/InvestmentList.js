import Investment from "./Investment";
import React from "react";

const InvestmentList = ({investments}) => {

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

export default InvestmentList;