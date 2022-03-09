import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    participant_ranking: CONTEST_BASE_URL + "/contest/participants-by-rank",
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

const getContest = contestNumber => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestQuery(contestNumber)
    });
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

const getContests = statusList => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestsQuery(statusList)
    });
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

const getContestParticipants = statusList => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: contestParticipantsQuery(statusList)
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
    getContestParticipants, getContests, signUpForContest,
    getParticipantRanking, getParticipantHistory, getContest
}

