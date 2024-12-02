import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_CONTEST_PARTICIPANT = "getContestParticipant";
export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getDetailedParticipantHistory";
export const GET_PARTICIPANTS_SYMBOL = "getParticipantsSymbol";
export const GET_ALL_REGISTERED_CONTESTS = "getAllRegisteredContests";
export const GET_ALL_UNREGISTERED_CONTESTS = "getAllUnregisteredContests";

const PARTICIPANT_PATH = CLIENT_BACKEND_BASE_PATH + "/participants";

export const getContestParticipantConfig = (contestId: number) => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/contest",
        params: {contestNumber: contestId}
    }
}

export const getSortedParticipantsConfig = (contestId: number, pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/sorted",
        params: {contestNumber: contestId, pageNumber, pageSize}
    }
}

export const getParticipantHistoryConfig = (username: string) => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/history",
        params: {username}
    }
}

export const getRegisteredContestsConfig = () => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/registered",
    }
}

export const getUnregisteredContestsConfig = () => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/unregistered",
    }
}

export const getRunningParticipantsSymbolConfig = (symbol: string) => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/unregistered",
        params: {symbol}
    }
}

export const getSignUpParticipantConfig = (contestId: number) => {
    return {
        method: "post",
        url: PARTICIPANT_PATH + "/sign-up/" + contestId
    }
}
