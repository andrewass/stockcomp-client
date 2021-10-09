import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    sign_in: baseUrl+"/auth/sign-in",
    sign_up: baseUrl+"/auth/sign-up",
    sign_out: baseUrl+"/auth/sign-out",
    refresh_token: baseUrl+"/auth/refresh-token"
};

const signUp = async (username, password, email) => {
    return axios({
        method: "post",
        url: URL.sign_up,
        data: {username, password, email},
        withCredentials: true
    });
};

const signIn = async (username, password) => {
    return axios({
        method: "post",
        url: URL.sign_in,
        data: {username, password},
        withCredentials: true
    })
};

const signOut = async () => {
    return axios({
        method: "post",
        url: URL.sign_out,
        withCredentials: true
    });
};

const refreshToken = () => {
    return axios({
        method: "get",
        url: URL.refresh_token,
        withCredentials: true
    });
}

const getSignedInUser = () => {
    return JSON.parse(localStorage.getItem("user"))
};

const updateLocalStorage = (isSignedIn) => {
    localStorage.setItem("isSignedIn", isSignedIn);
};

export {
    signIn,
    signUp,
    signOut,
    refreshToken,
    getSignedInUser,
    updateLocalStorage
};