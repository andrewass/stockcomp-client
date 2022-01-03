import axios from "axios";
import {BASE_URL} from "./serviceConfig";


const URL = {
    upcoming_contests: BASE_URL + "/contest/upcoming-contests",
    all_contests: BASE_URL + "/contest/all-contests",
    sign_up: BASE_URL + "/contest/sign-up",
    user_participating: BASE_URL + "/contest/user-participating",
    remaining_funds: BASE_URL + "/contest/remaining-funds",
    participant_ranking: BASE_URL + "/contest/participants-by-rank",
    participant_history: BASE_URL + "/contest/participant-history"
};

const getUpcomingContests = () => {
    return axios({
        method: "get",
        url: URL.upcoming_contests,
        withCredentials: true
    });
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
    getUpcomingContests, getAllContests, signUpForContest, getRemainingFunds,
    getParticipantRanking, getParticipantHistory
}

