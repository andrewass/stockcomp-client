import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_PARTICIPANT_CONTEST = "getContestParticipant";
export const GET_PARTICIPANTS_SORTED = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getDetailedParticipantHistory";
export const GET_PARTICIPANTS_SYMBOL = "getParticipantsSymbol";
export const GET_ALL_REGISTERED_CONTESTS = "getAllRegisteredContests";
export const GET_ALL_UNREGISTERED_CONTESTS = "getAllUnregisteredContests";

const PARTICIPANT_PATH = CLIENT_BACKEND_BASE_PATH + "/participants";

export const getDetailedParticipantForContestConfig = (contestId: number) => {
    return {
        method: "get",
        url: `${PARTICIPANT_PATH}/detailed/contest/${contestId}`,
    }
}

export const getDetailedParticipantsForSymbolConfig = (symbol: string) => ({
    method: "get",
    url: `${PARTICIPANT_PATH}/detailed/symbol/${symbol}`,
});

export const getSortedParticipantsConfig = (contestId: number, pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: PARTICIPANT_PATH + "/sorted",
        params: {contestId, pageNumber, pageSize}
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

export const getSignUpParticipantConfig = (contestId: number) => {
    return {
        method: "post",
        url: PARTICIPANT_PATH + "/sign-up/" + contestId
    }
}
