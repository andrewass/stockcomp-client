import {CONTEST_SERVER_BASE_URL} from "../../config/properties";

export const GET_USER_DETAILS = "getUserDetails"

export const getUserDetailsConfig = (username?: string) => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/user/get-details",
        params: {username}
    }
}