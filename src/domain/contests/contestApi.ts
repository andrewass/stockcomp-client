import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {CreateContestInput, UpdateContestInput} from "./contestTypes";

export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const GET_ALL_CONTESTS = "getAllContestsSorted";
export const GET_ALL_REGISTERED_CONTESTS = "getAllRegisteredContests";
export const GET_ALL_UNREGISTERED_CONTESTS = "getAllUnregisteredContests";

const CONTEST_PATH = CLIENT_BACKEND_BASE_PATH + "/contests";

export const getRegisteredContestsConfig = () => {
    return {
        method: "get",
        url: CONTEST_PATH + "/registered",
    }
}

export const getAllContestsConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_PATH + "/all",
        params: {pageNumber, pageSize}
    }
}

export const getUnregisteredContests = () => {
    return {
        method: "get",
        url: CONTEST_PATH + "/unregistered",
    }
}

export const getCreateContestConfig = (contestData: CreateContestInput) => {
    return {
        method: "post",
        url: CONTEST_PATH + "/create",
        data: contestData
    }
}

export const getDeleteContestConfig = (contestNumber: number) => {
    return {
        method: "delete",
        url: CONTEST_PATH + "/delete",
        params: {contestNumber}
    }
}

export const getUpdateContestConfig = (contestData: UpdateContestInput) => {
    return {
        method: "patch",
        url: CONTEST_PATH + "/update",
        data: contestData
    }
}

export const getContestConfig = (contestNumber: number) => {
    return {
        method: "get",
        url: CONTEST_PATH + "/" + contestNumber
    }
}

export const getSignUpToContestConfig = (contestNumber: number) => {
    return {
        method: "post",
        url: CONTEST_PATH + "/sign-up/" + contestNumber
    }
}