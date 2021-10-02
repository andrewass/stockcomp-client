import React, {useEffect, useState} from "react";
import "./trendingSymbols.css";
import SymbolPresentation from "../../SymbolPresentation";
import {getTrendingStocks} from "../../../../service/symbolService";
import {CircularProgress} from "@mui/material";

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
        return <CircularProgress/>
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
