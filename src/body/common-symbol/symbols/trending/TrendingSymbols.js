import React, {useEffect, useState} from "react";
import "./trendingSymbols.css";
import LoadingComponent from "../../../../util/LoadingComponent";
import SymbolPresentation from "../../SymbolPresentation";
import {getTrendingStocks} from "../../../../service/symbolService";

const TrendingSymbols = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [trendingSymbols, setTrendingSymbols] = useState([]);

    const getTrendingSymbols = async () => {
        const trendingSymbolsResponse = await getTrendingStocks();
        setTrendingSymbols(trendingSymbolsResponse.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getTrendingSymbols().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="trendingSymbols">
            <div id="symbolGrid">
                    {trendingSymbols.map((symbol) =>
                        <SymbolPresentation key={symbol.symbol} symbol={symbol}/>
                    )}
            </div>
        </div>
    );
}

export default TrendingSymbols;
