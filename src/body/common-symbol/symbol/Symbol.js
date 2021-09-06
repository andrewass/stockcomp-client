import Header from "../../../header/Header";
import Search from "../search/Search";
import React, {useContext, useEffect} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import "./symbol.css";
import SymbolState from "./SymbolState";
import LoadingComponent from "../../../util/LoadingComponent";

const Symbol = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    const {isLoading, currentPrice, getCurrentPrice} = SymbolState(selectedSymbol);

    useEffect(() => {
        getCurrentPrice();
    }, []);

    if (isLoading) {
        return <LoadingComponent/>;
    }
    return (
        <div id="symbolPage">
            <Header/>
            <Search/>
            <div id="symbolBody">
                <DetailBlock symbol={selectedSymbol} currentPrice={currentPrice}/>
                <SymbolRightMenu symbol={selectedSymbol} currentPrice={currentPrice}/>
            </div>
        </div>
    );
}

export default Symbol;