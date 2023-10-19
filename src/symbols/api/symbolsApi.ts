export const GET_PRICE_TRENDING_SYMBOLS = "getTrendingSymbols";


export const getTrendingSymbolsPriceConfig = () => {
    return {
        method: "get",
        url: "api/stock/current-price-trending-symbols"
    }
}



