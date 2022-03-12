import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    total_investment: CONTEST_BASE_URL + "/investment/total-investments",
    symbol_investment: CONTEST_BASE_URL + "/investment/symbol-investment",
    total_investment_value: CONTEST_BASE_URL + "/investment/total-investment-value"
}

const investmentsQuery = contestNumber => ({
    "query": `query investments($contestNumber: Int!) {
        investments(contestNumber: $contestNumber){
            symbol
            amount
            averageUnitCost
            totalValue
            totalProfit
        }
    }`,
    "variables": {contestNumber}
});

const getInvestments = async (contestNumber) => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: investmentsQuery(contestNumber)
    });
    return response.data.data.investments;
}

const investmentQuery = (symbol, contestNumber) => ({
    "query": `query investment($symbol: String!, $contestNumber: Int!) {
        investment(symbol: $symbol, contestNumber: $contestNumber){
            symbol
            amount
            averageUnitCost
            totalValue
            totalProfit
        }
    }`,
    "variables": {symbol, contestNumber}
});

const getInvestment = async (symbol, contestNumber) => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: investmentQuery(symbol, contestNumber)
    });
    return response.data.data.investment;
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
    getTotalValueInvestments, getInvestment, getInvestments
}