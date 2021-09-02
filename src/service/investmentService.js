import axios from "axios";

const URL = {
    total_investment : "http://localhost:8080/investment//total-investments",
}

const getAllInvestmentsForContest = (contestNumber) => {
    return axios({
        method: "get",
        url: URL.total_investment,
        params: {contestNumber},
        withCredentials: true
    });
}

export {
    getAllInvestmentsForContest
}