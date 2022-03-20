import axios from "axios";
import {CONTEST_BASE_URL} from "../../config/serviceConfig";


const URL = {
    start_contest_tasks: CONTEST_BASE_URL + "/admin/start-contest-tasks",
    stop_contest_tasks: CONTEST_BASE_URL + "/admin/stop-contest-tasks",
    complete_contest_tasks: CONTEST_BASE_URL + "/admin/complete-contest-tasks"
};

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

const completeContestTasks = contestNumber => {
    return axios({
        method: "post",
        url: URL.complete_contest_tasks,
        withCredentials: true,
        params: {contestNumber}
    });
}

export {
    startContestTasks, stopContestTasks, completeContestTasks
}