import {CONTEST_BASE_URL} from "../../config/properties";


export const getUserDetailsConfig = () => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/user/get-details"
    }
}