import {CLIENT_BACKEND_BASE_URL} from "../../config/properties";

export const GET_TRENDING_SYMBOLS = "getTrendingSymbols";


export const getTrendingSymbolsPriceConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_URL + "/stock/current-price-trending-symbols"
    }
}



