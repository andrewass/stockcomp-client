import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import Search from "../search/Search";
import PriceChart from "./PriceChart";
import "../symbols.css";
import SymbolDetail from "./SymbolDetail";

const DetailBlock = () => {

    const {pricelist, selectedSymbol, setHistoricPrices} = DetailBlockState();

    useEffect(() => {
        if(selectedSymbol !== undefined) {
            setHistoricPrices();
        }
    },[selectedSymbol]);

    return(
        <div id="detailBlock">
            <Search />
            <SymbolDetail selectedSymbol={selectedSymbol} />
            <PriceChart priceList={pricelist}/>
        </div>
    )
}

export default DetailBlock;
