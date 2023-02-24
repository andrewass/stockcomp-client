import {STOCK_BASE_URL} from "../../config/properties";

export const GET_TRENDING_SYMBOLS = "getTrendingSymbols";


export const getTrendingSymbolsConfig = () => {
    return {
        method: "get",
        url: STOCK_BASE_URL + "/stock/stock-quote-trending"
    }
}



