import {CONTEST_BASE_URL} from "../../config/properties";
import {CreateContestInput} from "../AdminCreateContest";


export const getContestsAdminConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}

export const getCreateContestConfig = (contestData: CreateContestInput) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/contest/create",
        data: contestData
    }
}