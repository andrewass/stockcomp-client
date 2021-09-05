import Header from "../../../header/Header";
import Search from "../search/Search";
import React, {useContext} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";

const Symbol = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    return (
        <div id="symbolPage">
            <Header/>
            <Search/>
            <div id="symbolBody">
                <DetailBlock symbol={selectedSymbol}/>
            </div>
        </div>
    );
}

export default Symbol;