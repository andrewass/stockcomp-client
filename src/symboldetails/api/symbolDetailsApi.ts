import {CONTEST_BASE_URL, STOCK_BASE_URL} from "../../config/properties";

export const GET_STOCK_SYMBOL_INFORMATION = "getStockSymbolInformation";
export const GET_ACTIVE_PARTICIPANT = "getActiveParticipant";
export const GET_HISTORIC_PRICES = "getHistoricPrices";


export const getStockSymbolInformationConfig = (symbol: string) => {
    return {
        method: "get",
        url: STOCK_BASE_URL + "/stock/symbol-information",
        params: {symbol}
    }
}

export const getHistoricPricesConfig = (symbol: string) => {
    return {
        method: "get",
        url: STOCK_BASE_URL + "/stock/historical-quotes",
        params: {symbol}
    }
}

export const getActiveParticipantConfig = () => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/participant/participant-by-active-contest"
    }
}
