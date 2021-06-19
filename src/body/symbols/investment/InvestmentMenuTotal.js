import React from "react";
import SymbolInvestmentTotal from "./SymbolInvestmentTotal";

const InvestmentMenuTotal = ({contestList}) => {

    return (
        <div>
            <SymbolInvestmentTotal contestList={contestList}/>
        </div>
    );
}

export default InvestmentMenuTotal;