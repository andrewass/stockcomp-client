import React, {useEffect} from "react";
import DetailBlockState from "./DetailBlockState";
import PriceChart from "./PriceChart";
import "./detailBlock.css";
import SymbolDetail from "./SymbolDetail";
import LoadingComponent from "../../../../util/LoadingComponent";

const DetailBlock = ({symbol, currentPrice}) => {

    const {historicPriceList, setHistoricPrices, isLoading} = DetailBlockState(symbol);

    useEffect(() => {
        setHistoricPrices();
    }, []);

    if (isLoading) {
        return <LoadingComponent/>;
    }
    return (
        <div id="detailBlock">
            <SymbolDetail symbol={symbol} realTimePrice={currentPrice}/>
            <PriceChart priceList={historicPriceList}/>
        </div>
    );
}

export default DetailBlock;
