import {CONTEST_SERVER_BASE_URL} from "../../config/properties";
import {CreateContestInput} from "../contests/AdminCreateContest";
import {UpdateContestInput} from "../contests/AdminUpdateContestForm";

export const GET_ALL_USERS_ADMIN = "getAllUsersAdmin";
export const GET_ALL_CONTESTS_ADMIN = "getAllContestsAdmin";

export const getAllUsersSortedConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/user/get-all-sorted",
        params: {pageNumber, pageSize}
    }
}

export const getContestsAdminConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}

export const getCreateContestConfig = (contestData: CreateContestInput) => {
    return {
        method: "post",
        url: CONTEST_SERVER_BASE_URL + "/contest/create",
        data: contestData
    }
}

export const getDeleteContestConfig = (contestNumber: number) => {
    return {
        method: "delete",
        url: CONTEST_SERVER_BASE_URL + "/contest/delete",
        params: {contestNumber}
    }
}

export const getUpdateContestConfig = (contestData: UpdateContestInput) => {
    return {
        method: "put",
        url: CONTEST_SERVER_BASE_URL + "/contest/update",
        data: contestData
    }
}