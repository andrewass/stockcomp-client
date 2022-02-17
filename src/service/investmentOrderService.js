import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";


const URL = {
    place_buy_order: CONTEST_BASE_URL+"/investment-order/place-buy-order",
    place_sell_order: CONTEST_BASE_URL+"/investment-order/place-sell-order",
    delete_active_order: CONTEST_BASE_URL+"/investment-order/delete-active-order",
    completed_orders_participant: CONTEST_BASE_URL+"/investment-order/completed-orders-participant",
    completed_orders_symbol_participant: CONTEST_BASE_URL+"/investment-order/completed-orders-symbol-participant",
    active_orders_participant: CONTEST_BASE_URL+"/investment-order/active-orders-participant",
    active_orders_participant_symbol: CONTEST_BASE_URL+"/investment-order/active-orders-symbol-participant"
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

const getCompletedOrdersSymbolParticipant = (contestNumber, symbol) => {
    return axios({
        method: "get",
        url: URL.completed_orders_symbol_participant,
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
    getCompletedOrdersParticipant, getCompletedOrdersSymbolParticipant,
    getActiveOrdersParticipant, getActiveOrdersParticipantSymbol
}