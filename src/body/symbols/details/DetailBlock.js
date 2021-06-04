import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import Search from "../search/Search";
import PriceChart from "./PriceChart";
import "./symboldetails.css";
import SymbolDetail from "./SymbolDetail";
import LoadingComponent from "../../../common/LoadingComponent";
import InvestmentMenu from "../investment/InvestmentMenu";

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
                    <InvestmentMenu symbol={selectedSymbol} currentPrice={realTimePrice.currentPrice}/>
                </div>
            </div>
        );
    }
}

export default DetailBlock;
