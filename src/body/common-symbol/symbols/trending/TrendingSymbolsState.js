import {useState} from "react";
import {getTrendingStocks} from "../../../../service/symbolService";


const TrendingSymbolsState = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [trendingSymbols, setTrendingSymbols] = useState([]);

    const getTrendingSymbols = async () => {
        const trendingSymbolsResponse = await getTrendingStocks();
        setTrendingSymbols(trendingSymbolsResponse.data);
        setIsLoading(false);
    }

    return{
        trendingSymbols, getTrendingSymbols, isLoading
    }
}

export default TrendingSymbolsState;