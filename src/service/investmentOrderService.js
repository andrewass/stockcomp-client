import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";

const URL = {
    delete_active_order: CONTEST_BASE_URL+"/investment-order/delete-active-order"
}

const placeInvestmentOrderMutation = input => ({
    "query": `mutation placeInvestmentOrder($input: OrderInput!) {
        placeInvestmentOrder(input: $input)
    }`,
    "variables": {input}
});

const placeInvestmentOrder = request => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: placeInvestmentOrderMutation(request)
    });
}


const deleteActiveOrder = (orderId) => {
    return axios({
        method: "post",
        url: URL.delete_active_order,
        params: {orderId},
        withCredentials: true
    });
}

const investmentOrdersQuery = (contestNumber, statusList) => ({
    "query": `query investmentOrders($contestNumber: Int!, $statusList: [OrderStatus!]) {
        investmentOrders(contestNumber: $contestNumber, statusList: $statusList){
            orderId
            orderStatus
            remainingAmount
            totalAmount
            transactionType
            symbol
            acceptedPrice
            currency
        }
    }`,
    "variables": {contestNumber, statusList}
});

const getInvestmentOrders = async (contestNumber, statusList) => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: investmentOrdersQuery(contestNumber, statusList)
    });
    return response.data.data.investmentOrders;
}

const investmentOrdersSymbolQuery = (symbol, contestNumber, statusList) => ({
    "query": `query investmentOrdersSymbol($symbol: String!, $contestNumber: Int!, $statusList: [OrderStatus!]) {
        investmentOrdersSymbol(symbol: $symbol, contestNumber: $contestNumber, statusList: $statusList){
            orderId
            orderStatus
            remainingAmount
            totalAmount
            transactionType
            symbol
            acceptedPrice
            currency
        }
    }`,
    "variables": {symbol, contestNumber, statusList}
});

const getInvestmentOrdersSymbol = async (symbol, contestNumber, statusList) => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: investmentOrdersSymbolQuery(symbol, contestNumber, statusList)
    });
    return response.data.data.investmentOrdersSymbol;
}

export {
    placeInvestmentOrder, deleteActiveOrder,
    getInvestmentOrders, getInvestmentOrdersSymbol
}