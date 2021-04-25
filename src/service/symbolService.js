import axios from "axios";

const URL = {
    search_symbol: "http://localhost:8080/stock/search-symbol",
    symbol_suggestions: "http://localhost:8080/stock/symbol-suggestions",
    historic_prices: "http://localhost:8080/stock/historic-prices",
    real_time_price: "http://localhost:8080/stock/real-time-price"
};

const getSuggestionsFromQuery = (query) => {
    return axios({
        method: "get",
        url: URL.symbol_suggestions,
        params: {query},
        withCredentials: true
    });
}

const searchSymbol = (symbol) => {
    return axios({
        method: "get",
        url: URL.search_symbol,
        params: {symbol},
        withCredentials: true
    });
};

const getHistoricPrices = (symbol) => {
    return axios({
        method: "get",
        url: URL.historic_prices,
        params: {symbol},
        withCredentials: true
    });
}

const getRealTimePrice = (symbol) => {
    return axios({
        method: "get",
        url: URL.real_time_price,
        params: {symbol},
        withCredentials: true
    });
}

export {
    searchSymbol, getSuggestionsFromQuery, getHistoricPrices, getRealTimePrice
};
