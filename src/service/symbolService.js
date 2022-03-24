import axios from "axios";
import {GRAPHQL_STOCK_URL, STOCK_BASE_URL} from "../config/serviceConfig";


const URL = {
    symbol_suggestions: STOCK_BASE_URL + "/stock/suggestions",
    historic_prices: STOCK_BASE_URL + "/stock/historical-quotes",
    real_time_price: STOCK_BASE_URL + "/stock/stock-quote",
    trending_stocks: STOCK_BASE_URL + "/stock/stock-quote-trending"
};

const stockSymbolInformationQuery = symbol => ({
    "query": `query GetStockSymbolInformation($symbol: String!) {
        stockSymbolInformation(symbol: $symbol) {
            symbol
            companyName
            stockQuote {
                price
                previousClose
                currency
                usdPrice
            }
            stockStats {
                priceToEarnings
            }
        }
    }`,
    "variables": {symbol}
});

const getStockSymbolInformation = async symbol => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_STOCK_URL,
        data: stockSymbolInformationQuery(symbol)
    });
    return response.data.data.stockSymbolInformation;
}

const getSuggestionsFromQuery = query => {
    return axios({
        method: "get",
        url: URL.symbol_suggestions + "/" + query,
        withCredentials: true
    });
}

const getHistoricPrices = symbol => {
    return axios({
        method: "get",
        url: URL.historic_prices + "/" + symbol,
        withCredentials: true
    });
}

const getRealTimePrice = symbol => {
    return axios({
        method: "get",
        url: URL.real_time_price + "/" + symbol,
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
    getStockSymbolInformation, getSuggestionsFromQuery, getHistoricPrices, getRealTimePrice, getTrendingStocks
};
