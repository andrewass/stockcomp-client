import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_ACTIVE_CONTESTS = "getActiveContests";
export const GET_ALL_CONTESTS = "getAllContests";
export const GET_CONTEST_BY_NUMBER = "getContestByNumber"

export const getActiveContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}

export const getContestConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL+"/contest/get-by-number",
        params: {contestNumber}
    }
}

export const getContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL+"/contest/get-by-status",
        data: statusList
    }
}