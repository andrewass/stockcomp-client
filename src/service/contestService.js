import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    participant_history: CONTEST_BASE_URL + "/contest/participant-history",
    contest_participants: CONTEST_BASE_URL + "/contest/contest-participants"
}

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
        url: GRAPHQL_CONTEST_URL+"?op=getContest",
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
        url: GRAPHQL_CONTEST_URL+"?op=getContests",
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
        url: GRAPHQL_CONTEST_URL+"?op=signUpContest",
        data: signUpContestMutation(contestNumber)
    });
}

const getContestParticipants = async statusList => {
    console.log("Status list is "+statusList)
    const response = await axios({
        method: "post",
        url: URL.contest_participants,
        data: statusList,
        withCredentials: true
    });
    return response.data;
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
    const response =  await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL+"?op=getSortedParticipants",
        data: sortedParticipantsQuery(contestNumber)
    });
    return response.data.data.sortedParticipants;
}

const getParticipantHistory = async username => {
    const response = await axios({
        method: "get",
        url: URL.participant_history,
        withCredentials: true,
        params: {username}
    });
    return response;
}

export {
    getContestParticipants, getContests, signUpForContest,
    getSortedParticipants, getParticipantHistory, getContest
}

