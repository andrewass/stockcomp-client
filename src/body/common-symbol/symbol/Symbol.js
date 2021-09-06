import Header from "../../../header/Header";
import Search from "../search/Search";
import React, {useContext} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import "./symbol.css";

const Symbol = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    return (
        <div id="symbolPage">
            <Header/>
            <Search/>
            <div id="symbolBody">
                <DetailBlock symbol={selectedSymbol}/>
                <SymbolRightMenu symbol={selectedSymbol}/>
            </div>
        </div>
    );
}

export default Symbol;