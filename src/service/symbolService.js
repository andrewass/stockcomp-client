import axios from "axios";


const URL = {
    search_symbol: "http://localhost:8080/stock/search-symbol",
    get_suggestions: "http://localhost:8080/stock/symbol-suggestions"
};

const getSuggestions = (query) => {
    return axios({
        method: "get",
        url: URL.get_suggestions,
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

export default {
    searchSymbol, getSuggestions
};