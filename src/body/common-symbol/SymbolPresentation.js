import React from "react";

const SymbolPresentation = ({symbol}) => {

    const priceDifference = (symbol.price - symbol.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / symbol.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrince = () => {
        if (symbol.currency === "USD") {
            return <li>{symbol.price} {symbol.currency}</li>;
        } else {
            return <li>{symbol.price} {symbol.currency} (USD {symbol.usdPrice.toFixed(2)})</li>;
        }
    }


    return (
        <div id="SymbolPresentation">
            <p>{symbol.name} ({symbol.symbol})</p>
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

export default SymbolPresentation;