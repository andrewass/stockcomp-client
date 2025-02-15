import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {InvestmentOrderRequest} from "./investmentOrderTypes";

export const GET_ALL_ACTIVE_INVESTMENT_ORDERS = "getActiveInvestmentOrders"
export const GET_ALL_COMPLETED_INVESTMENT_ORDERS = "getCompletedInvestmentOrders"
export const GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL = "getActiveInvestmentOrdersSymbol"
export const GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL = "getCompletedInvestmentOrders"


const baseUrl = CLIENT_BACKEND_BASE_PATH + "/investmentorders"

export const getPostInvestmentOrderConfig = (request: InvestmentOrderRequest) => {
    return {
        method: "post",
        url: `${baseUrl}/order`,
        body: request
    };
}

export const getDeleteInvestmentOrderConfig = (orderId: number) => {
    return {
        method: "delete",
        url: baseUrl + "/delete-order",
        params: {orderId}
    };
}

export const getAllActiveInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: baseUrl + "/all-active",
        params: {contestNumber}
    };
}

export const getAllCompletedInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: baseUrl + "/all-completed",
        params: {contestNumber}
    };
}

export const getSymbolActiveInvestmentOrdersConfig = (contestNumber: number, symbol: string) => {
    return {
        method: "get",
        url: baseUrl + "/symbol-active",
        params: {contestNumber, symbol}
    };
}

export const getSymbolCompletedInvestmentOrdersConfig = (contestNumber: number, symbol: string) => {
    return {
        method: "get",
        url: baseUrl + "/symbol-completed",
        params: {contestNumber, symbol}
    };
}
