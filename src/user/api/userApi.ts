import {CONTEST_BASE_URL} from "../../config/properties";
import {UpdateUserInput} from "../UserDetailsForm";

export const GET_USER_DETAILS = "getUserDetails"

export const getUserDetailsConfig = () => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/user/get-details"
    }
}

export const updateUserDataConfig = (userData: UpdateUserInput) => {
    return {
        method: "post",
        url: CONTEST_BASE_URL + "/user/update-details",
        data: userData
    }
}