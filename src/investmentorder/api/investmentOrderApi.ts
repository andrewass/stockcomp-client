import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {InvestmentOrderRequest} from "../InvestmentOrderForm";

export const GET_ALL_ACTIVE_INVESTMENT_ORDERS = "getActiveInvestmentOrders"
export const GET_ALL_COMPLETED_INVESTMENT_ORDERS = "getCompletedInvestmentOrders"
export const GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL = "getActiveInvestmentOrdersSymbol"
export const GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL = "getCompletedInvestmentOrders"


export const getPostInvestmentOrderConfig = (request: InvestmentOrderRequest) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/place-order",
        data: request
    };
}

export const getDeleteInvestmentOrderConfig = (orderId: number) => {
    return {
        method: "delete",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/delete-order",
        params: {orderId}
    };
}

export const getActiveInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/all-active",
        params: {contestNumber}
    };
}

export const getCompletedInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/all-deleted",
        params: {contestNumber}
    };
}

export const getInvestmentOrdersSymbolConfig = (symbol: string, contestNumber: number, statusList: string[]) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/get-by-status-symbol",
        data: {contestNumber, statusList, symbol}
    };
}
