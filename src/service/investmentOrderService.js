import axios from "axios";

const URL = {
    completed_orders_participant : "http://localhost:8080/investment-order/completed-orders-participant",
    completed_orders_participant_symbol : "http://localhost:8080/investment-order/completed-orders-symbol-participant"
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
        url: URL.completed_orders_participant,
        params: {contestNumber, symbol},
        withCredentials: true
    });
}

export {
    getCompletedOrdersParticipant
}