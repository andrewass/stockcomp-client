import React from "react";
import "../symbols.css";

const SymbolDetail = ({selectedSymbol}) => {

    return(
        <div id="symbolDetail">
            <p>{selectedSymbol.symbol} : {selectedSymbol.description}</p>
        </div>
    );
}

export default SymbolDetail
