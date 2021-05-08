import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import Search from "../search/Search";
import PriceChart from "./PriceChart";
import "../symbols.css";
import "./symboldetails.css";
import SymbolDetail from "./SymbolDetail";
import LoadingComponent from "../../../common/LoadingComponent";
import TransactionMenu from "../transaction/TransactionMenu";

const DetailBlock = () => {

    const {priceList, selectedSymbol, setHistoricPrices, setCurrentPrice, realTimePrice} = DetailBlockState();

    useEffect(() => {
        if (selectedSymbol !== undefined) {
            setCurrentPrice();
            setHistoricPrices();
        }
    }, [selectedSymbol]);

    if (priceList === undefined || realTimePrice === undefined) {
        return (
            <LoadingComponent/>
        );
    } else {
        return (
            <div id="detailBlock">
                <Search/>
                <div id="selectedSymbol">
                    <div id="symbolDescription">
                        <SymbolDetail selectedSymbol={selectedSymbol} realTimePrice={realTimePrice}/>
                        <PriceChart priceList={priceList}/>
                    </div>
                    <TransactionMenu/>
                </div>
            </div>
        );
    }
}

export default DetailBlock;
