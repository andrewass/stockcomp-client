import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";


const URL = {
    upcoming_contests: CONTEST_BASE_URL + "/contest/upcoming-contests",
    all_contests: CONTEST_BASE_URL + "/contest/all-contests",
    contests_by_status : CONTEST_BASE_URL + "/contest/contests-by-status",
    sign_up: CONTEST_BASE_URL + "/contest/sign-up",
    user_participating: CONTEST_BASE_URL + "/contest/user-participating",
    remaining_funds: CONTEST_BASE_URL + "/contest/remaining-funds",
    participant_ranking: CONTEST_BASE_URL + "/contest/participants-by-rank",
    participant_history: CONTEST_BASE_URL + "/contest/participant-history"
};

const getUpcomingContests = () => {
    return axios({
        method: "get",
        url: URL.upcoming_contests,
        withCredentials: true
    });
}

const getActiveContests = () => {
    return axios({
        method: "post",
        url: URL.contests_by_status,
        withCredentials: true,
        data: ["Running","Stopped"]
    })
}

const getAllContests = () => {
    return axios({
        method: "get",
        url: URL.all_contests,
        withCredentials: true
    });
}

const signUpForContest = contestNumber => {
    return axios({
        method: "post",
        url: URL.sign_up,
        withCredentials: true,
        params: {contestNumber}
    });
}

const getRemainingFunds = contestNumber => {
    return axios({
        method: "get",
        url: URL.remaining_funds,
        withCredentials: true,
        params: {contestNumber}
    });
}

const getParticipantRanking = contestNumber => {
    return axios({
        method: "get",
        url: URL.participant_ranking,
        withCredentials: true,
        params: {contestNumber}
    });
}

const getParticipantHistory = username => {
    return axios({
        method: "get",
        url: URL.participant_history,
        withCredentials: true,
        params: {username}
    });
}

export {
    getUpcomingContests, getAllContests, getActiveContests, signUpForContest, getRemainingFunds,
    getParticipantRanking, getParticipantHistory
}

