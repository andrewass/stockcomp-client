import React, {useEffect} from "react";
import "./trendingSymbols.css";
import TrendingSymbolsState from "./TrendingSymbolsState";
import LoadingComponent from "../../../../util/LoadingComponent";
import SymbolPresentation from "../../SymbolPresentation";

const TrendingSymbols = () => {

    const {trendingSymbols, getTrendingSymbols, isLoading} = TrendingSymbolsState();

    useEffect(() => {
        getTrendingSymbols()
            .catch(error => console.log(error));
    }, []);


    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div id="trendingSymbols">
            <ul>
                {trendingSymbols.map((symbol) =>
                    <SymbolPresentation symbol={symbol.name} name={symbol.name}/>
                )}
            </ul>
        </div>
    );
}

export default TrendingSymbols;
