import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const GET_ALL_CONTESTS_SORTED = "getAllContestsSorted";
export const GET_ALL_REGISTERED_CONTESTS = "getAllRegisteredContests";
export const GET_ALL_UNREGISTERED_CONTESTS = "getAllUnregisteredContests";

export const getRegisteredContests = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/contests/registered",
    }
}

export const getUnregisteredContests = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/contests/unregistered",
    }
}

export const getAllContestsSortedByContestNumberConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/contests/sorted",
        params: {pageNumber, pageSize}
    }
}

export const getContestConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/contests/" + contestNumber
    }
}

export const getSignUpToContestConfig = (contestNumber: number) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/contests/sign-up",
        params: {contestNumber}
    }
}