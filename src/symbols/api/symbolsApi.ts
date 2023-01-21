import {CONTEST_BASE_URL} from "../../config/properties";


export const GET_ACTIVE_CONTESTS = "getActiveContests";
export const GET_CONTEST_PARTICIPANT = "getContestParticipant"

export const getActiveContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}

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

