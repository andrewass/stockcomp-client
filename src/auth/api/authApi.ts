export const GET_VALID_SESSION = "getValidSession";
export const GET_LOGOUT = "getLogOut";

export const getValidSessionConfig = () => {
    return {
        method: "get",
        url: "api/valid-session"
    }
}

export const getLogOutConfig = () => {
    return {
        method: "post",
        url: "api/logout"
    }
}