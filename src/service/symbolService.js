import axios from "axios";


const baseUrl = process.env.REACT_APP_STOCK_QUOTE_BASE_URL;

const URL = {
    symbol_suggestions: baseUrl+"/stock/suggestions",
    historic_prices: baseUrl+"/stock/historical-quotes",
    real_time_price: baseUrl+"/stock/stock-quote",
    trending_stocks: baseUrl+"/stock/stock-quote-trending"
};

const getSuggestionsFromQuery = (query) => {
    return axios({
        method: "get",
        url: URL.symbol_suggestions+"/"+query,
        withCredentials: true
    });
}

const getHistoricPrices = (symbol) => {
    return axios({
        method: "get",
        url: URL.historic_prices+"/"+symbol,
        withCredentials: true
    });
}

const getRealTimePrice = (symbol) => {
    return axios({
        method: "get",
        url: URL.real_time_price+"/"+symbol,
        withCredentials: true
    });
}

const getTrendingStocks = () => {
    return axios({
        method: "get",
        url: URL.trending_stocks,
        withCredentials: true
    });
}

export {
    getSuggestionsFromQuery, getHistoricPrices, getRealTimePrice, getTrendingStocks
};
