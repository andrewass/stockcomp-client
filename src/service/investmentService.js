import axios from "axios";
import {BASE_URL} from "./serviceConfig";


const URL = {
    total_investment: BASE_URL + "/investment/total-investments",
    symbol_investment: BASE_URL + "/investment/symbol-investment",
    total_investment_value: BASE_URL + "/investment/total-investment-value"
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