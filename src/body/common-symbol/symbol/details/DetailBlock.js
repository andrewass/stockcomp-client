import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import Search from "../../search/Search";
import PriceChart from "./PriceChart";
import "./symboldetails.css";
import SymbolDetail from "./SymbolDetail";
import LoadingComponent from "../../../../util/LoadingComponent";
import InvestmentMenu from "../investment/InvestmentMenu";
import Header from "../../../../header/Header";

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
                <Header/>
                <Search/>
                <div id="selectedSymbol">
                    <div id="symbolDescription">
                        <SymbolDetail selectedSymbol={selectedSymbol} realTimePrice={realTimePrice}/>
                        <PriceChart priceList={priceList}/>
                    </div>
                    <InvestmentMenu symbol={selectedSymbol} realTimePrice={realTimePrice}/>
                </div>
            </div>
        );
    }
}

export default DetailBlock;
