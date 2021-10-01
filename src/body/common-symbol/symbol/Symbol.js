import React, {useContext, useEffect, useState} from "react";
import {SymbolContext} from "../../../context/SymbolContext";
import DetailBlock from "./details/DetailBlock";
import SymbolRightMenu from "./right-menu/SymbolRightMenu";
import "./symbol.css";
import LoadingComponent from "../../../util/LoadingComponent";
import SearchBar from "../search/SearchBar";
import {getRealTimePrice} from "../../../service/symbolService";

const Symbol = () => {

    const {selectedSymbol} = useContext(SymbolContext);

    const [isLoading, setIsLoading] = useState(true);
    const [currentPrice, setCurrentPrice] = useState();

    const getCurrentPrice = async () => {
        setIsLoading(true);
        let response = await getRealTimePrice(selectedSymbol.symbol);
        setCurrentPrice(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCurrentPrice().catch(error => console.log(error));
    }, [selectedSymbol]);

    if (isLoading) {
        return <LoadingComponent/>;
    }
    return (
        <div id="symbolPage">
            <SearchBar/>
            <div id="symbolBody">
                <DetailBlock symbol={selectedSymbol} currentPrice={currentPrice}/>
                <SymbolRightMenu symbol={selectedSymbol} currentPrice={currentPrice}/>
            </div>
        </div>
    );
}

export default Symbol;