import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_CONTEST_PARTICIPANT = "getContestParticipant"
export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getDetailedParticipantHistory";
export const GET_PARTICIPANTS_SYMBOL = "getParticipantsSymbol";

export const getContestParticipantConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/contest",
        params: {contestNumber}
    }
}

export const getSignUpParticipantConfig = (contestNumber: number) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/sign-up",
        params: {contestNumber}
    }
}

export const getSortedParticipantsConfig = (contestNumber: number, pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/sorted",
        params: {contestNumber, pageNumber, pageSize}
    }
}

export const getParticipantHistoryConfig = (username: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/history",
        params: {username}
    }
}

export const getRunningParticipantsSymbol = (symbol: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participant/running-participants",
        params: {symbol}
    }
}