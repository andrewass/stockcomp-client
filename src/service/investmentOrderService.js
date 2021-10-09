import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    place_buy_order: baseUrl+"/investment-order/place-buy-order",
    place_sell_order: baseUrl+"/investment-order/place-sell-order",
    delete_active_order: baseUrl+"/investment-order/delete-active-order",
    completed_orders_participant: baseUrl+"/investment-order/completed-orders-participant",
    completed_orders_participant_symbol: baseUrl+"/investment-order/completed-orders-symbol-participant",
    active_orders_participant: baseUrl+"/investment-order/active-orders-participant",
    active_orders_participant_symbol: baseUrl+"/investment-order/active-orders-symbol-participant"
}

const placeBuyOrder = (request) => {
    return axios({
        method: "post",
        url: URL.place_buy_order,
        withCredentials: true,
        data : request
    })
}

const placeSellOrder = (request) => {
    return axios({
        method: "post",
        url: URL.place_sell_order,
        withCredentials: true,
        data : request
    })
}

const deleteActiveOrder = (orderId) => {
    return axios({
        method: "post",
        url: URL.delete_active_order,
        params: {orderId},
        withCredentials: true
    });
}


const getCompletedOrdersParticipant = (contestNumber) => {
    return axios({
        method: "get",
        url: URL.completed_orders_participant,
        params: {contestNumber},
        withCredentials: true
    });
}

const getCompletedOrdersParticipantSymbol = (contestNumber, symbol) => {
    return axios({
        method: "get",
        url: URL.completed_orders_participant_symbol,
        params: {contestNumber, symbol},
        withCredentials: true
    });
}

const getActiveOrdersParticipant = (contestNumber) => {
    return axios({
        method: "get",
        url: URL.active_orders_participant,
        params: {contestNumber},
        withCredentials: true
    });
}

const getActiveOrdersParticipantSymbol = (contestNumber, symbol) => {
    return axios({
        method: "get",
        url: URL.active_orders_participant_symbol,
        params: {contestNumber, symbol},
        withCredentials: true
    });
}

export {
    placeBuyOrder, placeSellOrder, deleteActiveOrder,
    getCompletedOrdersParticipant, getCompletedOrdersParticipantSymbol,
    getActiveOrdersParticipant, getActiveOrdersParticipantSymbol
}