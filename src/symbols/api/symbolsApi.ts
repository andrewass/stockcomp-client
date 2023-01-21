import {CONTEST_BASE_URL} from "../../config/properties";


export const GET_ACTIVE_CONTESTS = "getActiveContests";

export const getActiveContestsConfig = (statusList: string[]) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/contest/get-by-status",
        data: statusList
    }
}
