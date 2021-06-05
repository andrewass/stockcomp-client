import React from "react";

const SymbolDetail = ({selectedSymbol, realTimePrice}) => {

    const diffUSD = (realTimePrice.currentPrice - realTimePrice.previousClosePrice).toFixed(2);
    const diffPercentage = ((diffUSD / realTimePrice.previousClosePrice) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return diffUSD >= 0.00 ? "+"+diffUSD : diffUSD;
    }

    const getPriceDifferencePercentage = () => {
        return diffUSD >= 0.00 ? "+"+diffPercentage : diffPercentage;
    }

    return(
        <div id="symbolDetail">
            <p>{selectedSymbol.description} ({selectedSymbol.symbol})</p>
            <ul id="currentPriceList">
                <li>{realTimePrice.currentPrice} USD</li>
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
