import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";

const URL = {
    get_investment_orders: CONTEST_BASE_URL + "/investmentorder/get-by-status",
    get_investment_orders_symbol: CONTEST_BASE_URL + "/investmentorder/get-by-status-symbol",
    place_investment_order: CONTEST_BASE_URL + "/investmentorder/place-order",
    delete_investment_order: CONTEST_BASE_URL + "/investmentorder/delete-order"
}

const placeInvestmentOrder = request => {
    return axios({
        method: "post",
        url: URL.place_investment_order,
        data: request
    });
}

const deleteInvestmentOrder = orderId => {
    return axios({
        method: "post",
        url: URL.delete_investment_order,
        params: {orderId}
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