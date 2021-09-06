import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import PriceChart from "./PriceChart";
import "./detail-block.css";
import SymbolDetail from "./SymbolDetail";
import LoadingComponent from "../../../../util/LoadingComponent";

const DetailBlock = ({symbol}) => {

    const {priceList, setHistoricPrices, setCurrentPrice, realTimePrice} = DetailBlockState(symbol);

    useEffect(() => {
        if (symbol !== undefined) {
            setCurrentPrice();
            setHistoricPrices();
        }
    }, [symbol]);

    if (priceList === undefined || realTimePrice === undefined) {
        return (
            <LoadingComponent/>
        );
    } else {
        return (
            <div id="detailBlock">
                <SymbolDetail symbol={symbol} realTimePrice={realTimePrice}/>
                <PriceChart priceList={priceList}/>
            </div>
        );
    }
}

export default DetailBlock;
