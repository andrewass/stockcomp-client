import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    update_leaderboard: baseUrl + "/admin/update-leaderboard",
    start_investment_processing: baseUrl + "/admin/start-investment-processing",
    stop_investment_processing: baseUrl + "/admin/stop-investment-processing",
    start_order_processing: baseUrl + "/admin/start-order-processing",
    stop_order_processing: baseUrl + "/admin/stop-order-processing",
};

const updateLeaderboard = contestNumber => {
    return axios({
        method: "post",
        url: URL.update_leaderboard,
        withCredentials: true,
        params: {contestNumber}
    });
}

const startInvestmentProcessing = () => {
    return axios({
        method: "post",
        url: URL.start_investment_processing,
        withCredentials: true
    });
}

const stopInvestmentProcessing = () => {
    return axios({
        method: "post",
        url: URL.stop_investment_processing,
        withCredentials: true
    });
}

const startOrderProcessing = () => {
    return axios({
        method: "post",
        url: URL.start_order_processing,
        withCredentials: true
    });
}

const stopOrderProcessing = () => {
    return axios({
        method: "post",
        url: URL.stop_order_processing,
        withCredentials: true
    });
}

export {
    updateLeaderboard, startInvestmentProcessing, stopInvestmentProcessing,
    startOrderProcessing, stopOrderProcessing
}