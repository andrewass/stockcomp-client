import axios from "axios";

const URL = {
    upcoming_contests: "http://localhost:8080/contest/upcoming-contests",
    sign_up: "http://localhost:8080/contest/sign-up",
    user_participating: "http://localhost:8080/contest/user-participating",
};

const getUpcomingContests = () => {
    return axios({
        method: "get",
        url: URL.upcoming_contests,
        withCredentials: true
    });
}

export {
    getUpcomingContests
}