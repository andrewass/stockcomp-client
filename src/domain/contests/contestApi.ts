import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {CreateContestInput, UpdateContestInput} from "./contestTypes";
import {CustomRequestConfig} from "../../config/useApiWrapper";

export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const GET_ALL_CONTESTS = "getAllContestsSorted";

const CONTEST_PATH = CLIENT_BACKEND_BASE_PATH + "/contests";

export const getAllContestsConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_PATH + "/all",
        params: {pageNumber, pageSize}
    }
}

export const getCreateContestConfig = (contestData: CreateContestInput): CustomRequestConfig  => {
    return {
        method: "post",
        url: CONTEST_PATH + "/create",
        body: contestData
    }
}

export const getDeleteContestConfig = (contestNumber: number): CustomRequestConfig => {
    return {
        method: "delete",
        url: CONTEST_PATH + "/" + contestNumber,
    }
}

export const getUpdateContestConfig = (contestData: UpdateContestInput) => {
    return {
        method: "patch",
        url: CONTEST_PATH + "/update",
        body: contestData
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
