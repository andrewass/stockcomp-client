import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    total_investment: baseUrl + "/investment/total-investments",
    symbol_investment: baseUrl + "/investment/symbol-investment",
    total_investment_value: baseUrl + "/investment/total-investment-value"
}

const getAllInvestmentsForContest = (contestNumber) => {
    return axios({
        method: "get",
        url: URL.total_investment,
        params: {contestNumber},
        withCredentials: true
    });
}

const getInvestmentOfSymbol = (contestNumber, symbol) => {
    return axios({
        method: "get",
        url: URL.symbol_investment,
        withCredentials: true,
        params: {contestNumber, symbol}
    });
}

const getTotalValueInvestments = contestNumber => {
    return axios({
        method: "get",
        url: URL.total_investment_value,
        withCredentials: true,
        params: {contestNumber}
    });
}

export {
    getAllInvestmentsForContest, getInvestmentOfSymbol, getTotalValueInvestments
}