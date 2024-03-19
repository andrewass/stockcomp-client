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

export const getAllActiveInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/all-active",
        params: {contestNumber}
    };
}

export const getAllCompletedInvestmentOrdersConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/all-completed",
        params: {contestNumber}
    };
}

export const getSymbolActiveInvestmentOrdersConfig = (contestNumber: number, symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/symbol-active",
        params: {contestNumber, symbol}
    };
}

export const getSymbolCompletedInvestmentOrdersConfig = (contestNumber: number, symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/investmentorder/symbol-completed",
        params: {contestNumber, symbol}
    };
}
