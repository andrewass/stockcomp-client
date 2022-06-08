import axios from "axios";
import {CONTEST_BASE_URL} from "../../../config/serviceConfig";


const URL = {
    participant_history: CONTEST_BASE_URL + "/contest/participant-history",
    contest_participations: CONTEST_BASE_URL + "/contest/contest-participations",
    contest_sign_up: CONTEST_BASE_URL + "/contest/sign-up-participant",
    get_by_status: CONTEST_BASE_URL + "/contest/get-by-status",
    get_by_number: CONTEST_BASE_URL + "/contest/get-by-number"
}

const getContest = async (contestNumber) => {
    const response = await axios({
        method: "get",
        url: URL.get_by_number,
        params: {contestNumber},
        withCredentials: true
    });
    return response.data;
}

const getContests = async (statusList) => {
    const response = await axios({
        method: "post",
        url: URL.get_by_status,
        data: statusList,
        withCredentials: true
    });
    return response.data;
}

const signUpForContest = contestNumber => {
    return axios({
        method: "post",
        url: URL.contest_sign_up,
        params: {contestNumber},
        withCredentials: true
    });
}

const getParticipantHistory = async username => {
    const response  = await axios({
        method: "get",
        url: URL.participant_history,
        withCredentials: true,
        params: {username}
    });
    return response.data;
}

export {
    getContests, signUpForContest,
    getParticipantHistory, getContest
}

