import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";
import {Contest} from "../types/contest";


const URL = {
    participant_history: CONTEST_BASE_URL + "/contest/participant-history",
    contest_participations: CONTEST_BASE_URL + "/contest/contest-participations",
    contest_sign_up: CONTEST_BASE_URL + "/contest/sign-up-participant",
    get_by_status: CONTEST_BASE_URL + "/contest/get-by-status",
    get_by_number: CONTEST_BASE_URL + "/contest/get-by-number"
}

const getContest = async (contestNumber: number) => {
    const response = await axios({
        method: "get",
        url: URL.get_by_number,
        params: {contestNumber}
    })
    return response.data
}

const getContests = async (statusList: string[]): Promise<Contest[]> => {
    const response = await axios({
        method: "post",
        url: URL.get_by_status,
        data: statusList
    })
    return response.data
}

const signUpForContest = (contestNumber: number) => {
    return axios({
        method: "post",
        url: URL.contest_sign_up,
        params: {contestNumber}
    })
}

const getParticipantHistory = async (username: string)  => {
    const response = await axios({
        method: "get",
        url: URL.participant_history,
        params: {username}
    })
    return response.data
}

export {
    getContests, signUpForContest,
    getParticipantHistory, getContest
}

