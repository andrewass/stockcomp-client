import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";
import {CreateContestInput} from "../contests/AdminCreateContest";
import {UpdateContestInput} from "../contests/AdminUpdateContestForm";

export const GET_ALL_USERS_ADMIN = "getAllUsersAdmin";
export const GET_ALL_CONTESTS_ADMIN = "getAllContestsAdmin";

export const getAllUsersSortedConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH + "/user/sorted",
        params: {pageNumber, pageSize}
    }
}

export const getContestsAdminConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/contest/status",
        data: statusList
    }
}

export const getCreateContestConfig = (contestData: CreateContestInput) => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH + "/contest/create",
        data: contestData
    }
}

export const getDeleteContestConfig = (contestNumber: number) => {
    return {
        method: "delete",
        url: CLIENT_BACKEND_BASE_PATH + "/contest/delete",
        params: {contestNumber}
    }
}

export const getUpdateContestConfig = (contestData: UpdateContestInput) => {
    return {
        method: "patch",
        url: CLIENT_BACKEND_BASE_PATH + "/contest/update",
        data: contestData
    }
}