import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    participant_history: CONTEST_BASE_URL + "/contest/participant-history"
};

const contestQuery = contestNumber => ({
    "query": `query contest($contestNumber: Int!) {
        contest(contestNumber: $contestNumber){
            startTime
            participantCount
            contestStatus
        }
    }`,
    "variables": {contestNumber}
});

const getContest = async (contestNumber) => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestQuery(contestNumber)
    });
    return response.data.data;
}

const contestsQuery = statusList => ({
    "query": `query contests($statusList: [ContestStatus!]) {
        contests(statusList: $statusList){
            contestNumber
            contestStatus
            participantCount
            startTime
        }
    }`,
    "variables": {statusList}
});

const getContests = async (statusList) => {
    const response =  await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestsQuery(statusList)
    });
    return response.data.data.contests;
}

const signUpContestMutation = contestNumber => ({
    "query": `mutation signUpContest($contestNumber: Int!) {
        signUpContest(contestNumber: $contestNumber)
    }`,
    "variables": {contestNumber}
});

const signUpForContest = contestNumber => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: signUpContestMutation(contestNumber)
    });
}

const contestParticipantsQuery = statusList => ({
    "query": `query contestParticipants($statusList: [ContestStatus!]) {
        contestParticipants(statusList: $statusList){
            contest {
                contestNumber
                contestStatus
                participantCount
                startTime
                endTime
            }
            participant {
                username
                rank
                totalValue
                remainingFunds
            }
        }
    }`,
    "variables": {statusList}
});

const getContestParticipants = async statusList => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestParticipantsQuery(statusList)
    });
    return response.data.data.contestParticipants;
}

const sortedParticipantsQuery = contestNumber => ({
    "query": `query sortedParticipants($contestNumber: Int!) {
        sortedParticipants(contestNumber: $contestNumber){
            username
            rank
            totalValue
        }
    }`,
    "variables": {contestNumber}
});

const getSortedParticipants = async contestNumber => {
    const response =  axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: sortedParticipantsQuery(contestNumber)
    });
    return response.data.data.sortedParticipants;
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
    getContestParticipants, getContests, signUpForContest,
    getSortedParticipants, getParticipantHistory, getContest
}

