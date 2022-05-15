import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../../../config/serviceConfig";

const URL = {
    get_investment_orders: CONTEST_BASE_URL + "/investmentorder/get-by-status",
    get_investment_orders_symbol : CONTEST_BASE_URL + "/investmentorder/get-by-status-symbol"
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

const getInvestmentOrdersSymbol = async (symbol, contestNumber, statusList) => {
    const response = await axios({
        method: "post",
        url: URL.get_investment_orders_symbol,
        data: {contestNumber, statusList, symbol}
    });
    return response.data;
}

export {
    placeInvestmentOrder, deleteInvestmentOrder,
    getInvestmentOrders, getInvestmentOrdersSymbol
}