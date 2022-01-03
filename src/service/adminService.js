import axios from "axios";
import {CONTEST_BASE_URL} from "./serviceConfig";


const URL = {
    update_leaderboard: CONTEST_BASE_URL + "/admin/update-leaderboard",
    start_contest_tasks: CONTEST_BASE_URL + "/admin/start-contest-tasks",
    stop_contest_tasks: CONTEST_BASE_URL + "/admin/stop-contest-tasks",
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