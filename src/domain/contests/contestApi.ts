import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {CustomRequestConfig} from "../../config/useApiWrapper";
import {CreateContestRequest, UpdateContestRequest} from "./contestDto";

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

export const getCreateContestConfig = (contestData: CreateContestRequest): CustomRequestConfig => {
    return {
        method: "post",
        url: CONTEST_PATH + "/create",
        body: contestData
    }
}

export const getDeleteContestConfig = (contestId: number): CustomRequestConfig => {
    return {
        method: "delete",
        url: CONTEST_PATH + "/" + contestId,
    }
}

export const getUpdateContestConfig = (request: UpdateContestRequest) => {
    return {
        method: "post",
        url: CONTEST_PATH + "/update",
        body: request
    }
}

export const getContestConfig = (contestId: number) => {
    return {
        method: "get",
        url: CONTEST_PATH + "/" + contestId
    }
}
