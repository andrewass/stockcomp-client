import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_ALL_INVESTMENTS_FOR_CONTEST = "getAllInvestmentsForContest";
export const GET_INVESTMENT_FOR_SYMBOL = "getInvestmentForSymbol";

export const getAllInvestmentsConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/investment/get-all",
        params: {contestNumber}
    };
}

export const getInvestmentConfig = (symbol: string, contestNumber: number) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/investment/get-by-symbol",
        data: {symbol, contestNumber}
    };
}