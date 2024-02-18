import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {Period} from "../symbolTypes";

export const GET_STOCK_SYMBOL_FINANCIALS = "getStockSymbolFinancials";
export const GET_STOCK_SYMBOL_PRICE = "getStockSymbolPrice"
export const GET_ACTIVE_PARTICIPANT = "getActiveParticipant";
export const GET_HISTORIC_PRICES = "getHistoricPrices";


export const getStockSymbolPriceConfig = (symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/stock/current-price-symbol",
        params: {symbol}
    }
}

export const getStockSymbolFinancialsConfig = (symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/stock/financial-details-symbol",
        params: {symbol}
    }
}

export const getHistoricPricesConfig = (symbol: string, period: Period) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/stock/historical-price",
        params: {symbol, period}
    }
}

export const getActiveParticipantConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/participant-by-active-contest"
    }
}
