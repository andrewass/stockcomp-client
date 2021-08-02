import axios from "axios";

const URL = {
    symbol_suggestions: "http://localhost:8088/stock/suggestions",
    historic_prices: "http://localhost:8088/stock/historical-quotes",
    real_time_price: "http://localhost:8088/stock/stock-quote"
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

export {
    getSuggestionsFromQuery, getHistoricPrices, getRealTimePrice
};
