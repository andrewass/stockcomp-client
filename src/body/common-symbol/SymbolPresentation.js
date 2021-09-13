import React from "react";

const SymbolPresentation = ({symbol, name}) => {

    return (
        <div className="symbolPresentation">
            <p>{symbol} : {name}</p>
        </div>
    );
}

export default SymbolPresentation;