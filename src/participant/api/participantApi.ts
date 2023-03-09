import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_CONTEST_PARTICIPANT = "getContestParticipant"
export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getParticipantHistory";


export const getContestParticipantConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/participant/participant-by-contest",
        params: {contestNumber}
    }
}

export const getSignUpParticipantConfig = (contestNumber: number) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/participant/sign-up-participant",
        params: {contestNumber}
    }
}


export const getSortedParticipantsConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/participant/sorted-participants",
        params: {contestNumber}
    }
}

export const getParticipantHistoryConfig = (username: string) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/participant/participant-history",
        params: {username}
    }
}

