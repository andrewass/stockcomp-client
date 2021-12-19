import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    update_leaderboard: baseUrl + "/admin/update-leaderboard",
    start_contest_tasks: baseUrl + "/admin/start-contest-tasks",
    stop_contest_tasks: baseUrl + "/admin/stop-contest-tasks",
};

const updateLeaderboard = contestNumber => {
    return axios({
        method: "post",
        url: URL.update_leaderboard,
        withCredentials: true,
        params: {contestNumber}
    });
}

const startContestTasks = () => {
    return axios({
        method: "post",
        url: URL.start_contest_tasks,
        withCredentials: true
    });
}

const stopContestTasks = () => {
    return axios({
        method: "post",
        url: URL.stop_contest_tasks,
        withCredentials: true
    });
}

export {
    updateLeaderboard, startContestTasks, stopContestTasks
}