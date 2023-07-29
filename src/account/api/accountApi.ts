import {CONTEST_SERVER_BASE_URL} from "../../config/properties";
import {UpdateAccountInput} from "../AccountDetailsForm";

export const GET_ACCOUNT_DETAILS = "getAccountDetails";

export const getAccountDetailsConfig = () => {
    return {
        method: "get",
        url: CONTEST_SERVER_BASE_URL + "/user/get-details",
    }
}


export const updateAccountDataConfig = (accountData: UpdateAccountInput) => {
    return {
        method: "put",
        url: CONTEST_SERVER_BASE_URL + "/user/update-details",
        data: accountData
    }
}
