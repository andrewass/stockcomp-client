import React from "react";
import PriceChart from "./PriceChart";
import "./detailBlock.css";
import SymbolPresentation from "../../SymbolPresentation";

const DetailBlock = ({symbol, currentPrice}) => {

    return (
        <div id="detailBlock">
            <div id="symbolDetail">
                <SymbolPresentation symbol={currentPrice}/>
            </div>
            <PriceChart symbol={symbol}/>
        </div>
    );
}

export default DetailBlock;
