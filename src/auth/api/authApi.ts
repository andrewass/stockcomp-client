import {CLIENT_BACKEND_BASE_PATH} from "../../config/properties";

export const GET_VALID_SESSION = "getValidSession";

export const getValidSessionConfig = () => {
    return {
        method: "get",
        url: CLIENT_BACKEND_BASE_PATH+"/auth/valid-session"
    }
}

export const getLogOutConfig = () => {
    return {
        method: "post",
        url: CLIENT_BACKEND_BASE_PATH+"/auth/logout"
    }
}