import axios from "axios";
import {BASE_URL} from "./serviceConfig";


const URL = {
    place_buy_order: BASE_URL+"/investment-order/place-buy-order",
    place_sell_order: BASE_URL+"/investment-order/place-sell-order",
    delete_active_order: BASE_URL+"/investment-order/delete-active-order",
    completed_orders_participant: BASE_URL+"/investment-order/completed-orders-participant",
    completed_orders_participant_symbol: BASE_URL+"/investment-order/completed-orders-symbol-participant",
    active_orders_participant: BASE_URL+"/investment-order/active-orders-participant",
    active_orders_participant_symbol: BASE_URL+"/investment-order/active-orders-symbol-participant"
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