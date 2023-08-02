import {CONTEST_SERVER_BASE_URL, CLIENT_BACKEND_BASE_URL} from "../../config/properties";
import {Period} from "../symbolTypes";

export const GET_STOCK_SYMBOL_FINANCIALS = "getStockSymbolFinancials";
export const GET_STOCK_SYMBOL_PRICE = "getStockSymbolPrice"
export const GET_ACTIVE_PARTICIPANT = "getActiveParticipant";
export const GET_HISTORIC_PRICES = "getHistoricPrices";


export const getStockSymbolPriceConfig = (symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_URL + "/stock/current-price-symbol",
        params: {symbol}
    }
}


export const getStockSymbolFinancialsConfig = (symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_URL + "/stock/financial-details-symbol",
        params: {symbol}
    }
}


export const getHistoricPricesConfig = (symbol: string, period: Period) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_URL + "/stock/historical-price",
        params: {symbol, period}
    }
}

export const getActiveParticipantConfig = () => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/participant/participant-by-active-contest"
    }
}
