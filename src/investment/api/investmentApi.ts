import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_ALL_ACTIVE_INVESTMENTS = "getAllActiveInvestments";
export const GET_INVESTMENT_FOR_SYMBOL = "getInvestmentForSymbol";

export const getAllInvestmentsConfig = () => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/investment/get-all",
    };
}

export const getSymbolInvestmentConfig = (symbol: string, contestNumber: number) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/investment/get-by-symbol",
        data: {symbol, contestNumber}
    };
}