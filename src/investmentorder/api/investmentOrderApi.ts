import {CONTEST_SERVER_BASE_URL} from "../../config/properties";
import {InvestmentOrderRequest} from "../InvestmentOrderForm";

export const GET_ALL_ACTIVE_INVESTMENT_ORDERS = "getActiveInvestmentOrders"
export const GET_ALL_COMPLETED_INVESTMENT_ORDERS = "getCompletedInvestmentOrders"
export const GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL = "getActiveInvestmentOrdersSymbol"
export const GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL = "getCompletedInvestmentOrders"


export const getPostInvestmentOrderConfig = (request: InvestmentOrderRequest) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/investmentorder/place-order",
        data: request
    };
}

export const getDeleteInvestmentOrderConfig = (orderId: number) => {
    return {
        method: "delete",
        url: CONTEST_SERVER_BASE_URL + "/investmentorder/delete-order",
        params: {orderId}
    };
}

export const getInvestmentOrdersConfig = (contestNumber: number, statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/investmentorder/get-by-status",
        data: {contestNumber, statusList}
    };
}

export const getAllInvestmentOrdersConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/investmentorder/get-all-by-status",
        data: {statusList}
    };
}

export const getInvestmentOrdersSymbolConfig = (symbol: string, contestNumber: number, statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/investmentorder/get-by-status-symbol",
        data: {contestNumber, statusList, symbol}
    };
}
