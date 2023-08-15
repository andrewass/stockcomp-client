import {CLIENT_BACKEND_BASE_URL} from "../../config/properties";

export const GET_SIGNED_IN_USER = "getSignedInUser";

export const getSignedInUserConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_URL + "/auth/get-user",
    }
}