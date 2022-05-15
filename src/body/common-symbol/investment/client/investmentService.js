import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../../../../config/serviceConfig";


const URL = {
    all_investments: CONTEST_BASE_URL + "/investment/get-all",
    symbol_investment: CONTEST_BASE_URL + "/investment/symbol-investment"
}

const getAllInvestments = async contestNumber => {
    const response = await axios({
        method: "get",
        url: URL.all_investments,
        params: {contestNumber}
    });
    return response.data;
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


export {getInvestment, getAllInvestments}