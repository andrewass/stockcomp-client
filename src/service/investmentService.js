import axios from "axios";

const URL = {
    total_investment : "http://localhost:8080/investment/total-investments",
    symbol_investment : "http://localhost:8080/investment/symbol-investment",
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

export {
    getAllInvestmentsForContest, getInvestmentOfSymbol
}