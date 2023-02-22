import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_SORTED_PARTICIPANTS = "getSortedParticipants";
export const GET_PARTICIPANT_HISTORY = "getParticipantHistory";

export const getSortedParticipantsConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/participant/sorted-participants",
        params: {contestNumber}
    }
}

export const getParticipantHistoryConfig = () => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/contest/participant-history"
    }
}