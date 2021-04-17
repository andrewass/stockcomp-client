import axios from "axios";


const URL = {
    search_symbol: "http://localhost:8080/stock/search-symbol",
    symbol_suggestions: "http://localhost:8080/stock/symbol-suggestions",
    historic_prices: "http://localhost:8080/stock/historic-prices"
};

const getSuggestions = (query) => {
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

export default {
    searchSymbol, getSuggestions, getHistoricPrices
};
