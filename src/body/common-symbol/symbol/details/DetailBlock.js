import React from "react";
import PriceChart from "./PriceChart";
import "./detailBlock.css";
import SymbolDetail from "./SymbolDetail";

const DetailBlock = ({symbol, currentPrice}) => {

    return (
        <div id="detailBlock">
            <SymbolDetail symbol={symbol} realTimePrice={currentPrice}/>
            <PriceChart symbol={symbol}/>
        </div>
    );
}

export default DetailBlock;
