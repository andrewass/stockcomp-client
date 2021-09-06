import React from "react";

const SymbolDetail = ({symbol, realTimePrice}) => {

    const priceDifference = (realTimePrice.price - realTimePrice.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / realTimePrice.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrince = () => {
        if (realTimePrice.currency === "USD") {
            return (
                <li>{realTimePrice.price} {realTimePrice.currency}</li>
            )
        } else {
            return (
                <li>
                    {realTimePrice.price} {realTimePrice.currency} (USD {realTimePrice.usdPrice.toFixed(2)})
                </li>
            )
        }
    }

    return (
        <div id="symbolDetail">
            <p>{symbol.description} ({symbol.symbol})</p>
            <ul id="currentPriceList">
                {getCurrentPrince()}
                <li className={priceDifference >= 0 ? "positivePriceDiff" : "negativePriceDiff"}>
                    {getPriceDifferenceUSD()}
                </li>
                <li className={priceDifference >= 0 ? "positivePriceDiff" : "negativePriceDiff"}>
                    ({getPriceDifferencePercentage()}%)
                </li>
            </ul>
        </div>
    );
}

export default SymbolDetail
