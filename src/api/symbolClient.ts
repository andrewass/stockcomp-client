import axios from "axios";
import {STOCK_BASE_URL} from "../config/properties";
import {HistoricalQuote} from "../symboldetails/symbolDetailTypes";


const URL = {
    symbol_suggestions: STOCK_BASE_URL + "/stock/suggestions",
    symbol_information: STOCK_BASE_URL + "/stock/symbol-information",
    historic_prices: STOCK_BASE_URL + "/stock/historical-quotes",
    real_time_price: STOCK_BASE_URL + "/stock/stock-quote",
    trending_stocks: STOCK_BASE_URL + "/stock/stock-quote-trending"
}

const getStockSymbolInformation = async (symbol: string) => {
    const response = await axios({
        method: "get",
        url: URL.symbol_information,
        params: {symbol}
    })
    return response.data
}

const getSuggestionsFromQuery = async (query: string) => {
    const response = await axios({
        method: "get",
        url: URL.symbol_suggestions,
        params: {query}
    })
    return response.data
}

const getHistoricPrices = async (symbol: string) : Promise<HistoricalQuote[]> => {
    const response = await axios({
        method: "get",
        url: URL.historic_prices,
        params: {symbol}
    })
    return response.data
}


export {
    getStockSymbolInformation, getSuggestionsFromQuery, getHistoricPrices
}
