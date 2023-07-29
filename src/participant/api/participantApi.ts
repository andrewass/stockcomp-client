import {CONTEST_SERVER_BASE_URL} from "../../config/properties";

export const GET_CONTEST_PARTICIPANT = "getContestParticipant"
export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_DETAILED_PARTICIPANT_HISTORY = "getDetailedParticipantHistory";


export const getContestParticipantConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/participant/participant-by-contest",
        params: {contestNumber}
    }
}

export const getSignUpParticipantConfig = (contestNumber: number) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/participant/sign-up-participant",
        params: {contestNumber}
    }
}


export const getSortedParticipantsConfig = (contestNumber: number, pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/participant/sorted-participants",
        params: {contestNumber, pageNumber, pageSize}
    }
}

export const getDetailedParticipantHistoryConfig = (username: string) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/participant/detailed-participant-history",
        params: {username}
    }
}

