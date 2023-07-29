import {CONTEST_SERVER_BASE_URL} from "../../config/properties";

export const GET_ACTIVE_CONTESTS = "getActiveContests";
export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const GET_ALL_CONTESTS_SORTED = "getAllContestsSorted";

export const getAllContestsSortedByContestNumberConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL+"/contest/get-all-sorted",
        params: {pageNumber, pageSize}
    }
}

export const getActiveContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}

export const getContestConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL+"/contest/get-by-number",
        params: {contestNumber}
    }
}