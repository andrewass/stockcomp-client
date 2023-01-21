import {STOCK_BASE_URL} from "../../config/properties";


export const getHistoricPricesConfig = (symbol: string) => {
    return {
        method: "get",
        url: STOCK_BASE_URL + "/stock/stock-quote-trending",
        params: {symbol}
    }
}