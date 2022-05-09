import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    total_investment: CONTEST_BASE_URL + "/investment/total-investments",
    symbol_investment: CONTEST_BASE_URL + "/investment/symbol-investment"
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

const getInvestments = async contestNumber => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL+"?op=getInvestments",
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
        url: GRAPHQL_CONTEST_URL+"?op=getInvestment",
        data: investmentQuery(symbol, contestNumber)
    });
    return response.data.data.investment;
}


export {getInvestment, getInvestments}