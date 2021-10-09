import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    upcoming_contests: baseUrl + "/contest/upcoming-contests",
    sign_up: baseUrl + "/contest/sign-up",
    user_participating: baseUrl + "/contest/user-participating",
    remaining_funds: baseUrl + "/contest/remaining-funds"
};

const getUpcomingContests = () => {
    return axios({
        method: "get",
        url: URL.upcoming_contests,
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

export {
    getUpcomingContests, signUpForContest, getRemainingFunds
}

