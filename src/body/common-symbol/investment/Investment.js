import React from "react";
import "./investment.css";

const Investment = ({investment}) => {

    const displayInvestmentProfit = () => {
        if (investment.totalProfit >= 0) {
            return <span id="positiveInvestmentProfit"> +{investment.totalProfit.toFixed(2)} USD</span>
        } else {
            return <span id="negativeInvestmentProfit"> {investment.totalProfit.toFixed(2)} USD</span>
        }
    }

    return (
        <div>
            <p>{investment.symbol} : </p>
            <ul>
                <li>Amount invested : {investment.amount}</li>
                <li>Investment value : {investment.totalValue.toFixed(2)} USD</li>
                <li>Investment profit : {displayInvestmentProfit()}</li>
            </ul>
        </div>
    );
}

export default Investment;