import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    update_leaderboard: baseUrl + "/admin/update-leaderboard"
};

const updateLeaderboard = contestNumber => {
    return axios({
        method: "post",
        url: URL.update_leaderboard,
        withCredentials: true,
        params: {contestNumber}
    });
}

export {
    updateLeaderboard
}