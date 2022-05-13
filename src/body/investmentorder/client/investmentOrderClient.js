import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../../../config/serviceConfig";

const URL = {
    get_investment_orders: CONTEST_BASE_URL + "/investmentorder/get-by-status",
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
        url: GRAPHQL_CONTEST_URL+"?op=placeInvestmentOrder",
        data: placeInvestmentOrderMutation(request)
    });
}

const deleteInvestmentOrderMutation = orderId => ({
    "query": `mutation deleteInvestmentOrder($orderId: Long!) {
        deleteInvestmentOrder(orderId: $orderId)
    }`,
    "variables": {orderId}
});

const deleteInvestmentOrder = orderId => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL+"?op=deleteInvestmentOrder",
        data: deleteInvestmentOrderMutation(orderId)
    });
}

const getInvestmentOrders = async (contestNumber, statusList) => {
    const response = await axios({
        method: "post",
        url: URL.get_investment_orders,
        data: {contestNumber, statusList}
    });
    return response.data;
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
        url: GRAPHQL_CONTEST_URL+"?op=getInvestmentOrdersSymbol",
        data: investmentOrdersSymbolQuery(symbol, contestNumber, statusList)
    });
    return response.data.data.investmentOrdersSymbol;
}

export {
    placeInvestmentOrder, deleteInvestmentOrder,
    getInvestmentOrders, getInvestmentOrdersSymbol
}