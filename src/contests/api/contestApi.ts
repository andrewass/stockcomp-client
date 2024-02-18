import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_ACTIVE_CONTESTS = "getActiveContests";
export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const GET_ALL_CONTESTS_SORTED = "getAllContestsSorted";

export const getAllContestsSortedByContestNumberConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH+"/contest/sorted",
        params: {pageNumber, pageSize}
    }
}

export const getActiveContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/contest/status",
        data: statusList
    }
}

export const getContestConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH+"/contest/number",
        params: {contestNumber}
    }
}