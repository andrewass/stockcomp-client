import axios from "axios";
import {STOCK_BASE_URL} from "../config/serviceConfig";


const URL = {
    symbol_suggestions: STOCK_BASE_URL + "/stock/suggestions",
    symbol_information: STOCK_BASE_URL + "/stock/symbol-information",
    historic_prices: STOCK_BASE_URL + "/stock/historical-quotes",
    real_time_price: STOCK_BASE_URL + "/stock/stock-quote",
    trending_stocks: STOCK_BASE_URL + "/stock/stock-quote-trending"
};

const getStockSymbolInformation = async symbol => {
    const response = await axios({
        method: "get",
        url: URL.symbol_information,
        params: {symbol}
    });
    return response.data;
}

const getSuggestionsFromQuery = query => {
    return axios({
        method: "get",
        url: URL.symbol_suggestions + "/" + query
    });
}

const getHistoricPrices = async symbol => {
    const response = await axios({
        method: "get",
        url: URL.historic_prices,
        params: {symbol}
    });
    return response.data;
}

const getTrendingStocks = () => {
    return axios({
        method: "get",
        url: URL.trending_stocks
    });
}

export {
    getStockSymbolInformation, getSuggestionsFromQuery, getHistoricPrices, getTrendingStocks
};
