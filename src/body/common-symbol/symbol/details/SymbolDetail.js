import React from "react";

const SymbolDetail = ({symbol, realTimePrice}) => {

    const diffUSD = (realTimePrice.currentPrice - realTimePrice.previousClosePrice).toFixed(2);
    const diffPercentage = ((diffUSD / realTimePrice.previousClosePrice) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return diffUSD >= 0.00 ? "+" + diffUSD : diffUSD;
    }

    const getPriceDifferencePercentage = () => {
        return diffUSD >= 0.00 ? "+" + diffPercentage : diffPercentage;
    }

    const getCurrentPrince = () => {
        if (realTimePrice.currency === "USD") {
            return (
                <li>{realTimePrice.currentPrice} {realTimePrice.currency}</li>
            )
        } else {
            return (
                <li>
                    {realTimePrice.currentPrice} {realTimePrice.currency} (USD {realTimePrice.usdPrice.toFixed(2)})
                </li>
            )
        }
    }

    return (
        <div id="symbolDetail">
            <p>{symbol.description} ({symbol.symbol})</p>
            <ul id="currentPriceList">
                {getCurrentPrince()}
                <li className={diffUSD >= 0 ? "positivePriceDiff" : "negativePriceDiff"}>
                    {getPriceDifferenceUSD()}
                </li>
                <li className={diffUSD >= 0 ? "positivePriceDiff" : "negativePriceDiff"}>
                    ({getPriceDifferencePercentage()}%)
                </li>
            </ul>
        </div>
    );
}

export default SymbolDetail
