import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_CONTEST_PARTICIPANT = "getContestParticipant";
export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getDetailedParticipantHistory";
export const GET_PARTICIPANTS_SYMBOL = "getParticipantsSymbol";
export const GET_ALL_REGISTERED_CONTESTS = "getAllRegisteredContests";
export const GET_ALL_UNREGISTERED_CONTESTS = "getAllUnregisteredContests";

export const getContestParticipantConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participants/contest",
        params: {contestNumber}
    }
}

export const getSortedParticipantsConfig = (contestNumber: number, pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participants/sorted",
        params: {contestNumber, pageNumber, pageSize}
    }
}

export const getParticipantHistoryConfig = (username: string) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participants/history",
        params: {username}
    }
}

export const getRegisteredContestsConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participants/registered",
    }
}

export const getUnregisteredContestsConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/participants/unregistered",
    }
}
