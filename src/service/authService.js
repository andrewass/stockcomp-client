import axios from "axios";

const BASE_URL = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const LOCALSTORAGE_KEY = "isSignedInStockComp";

const URL = {
    sign_in: BASE_URL + "/auth/sign-in",
    sign_up: BASE_URL + "/auth/sign-up",
    sign_out: BASE_URL + "/auth/sign-out",
    verify_admin: BASE_URL + "/auth/verify-admin",
    refresh_token: BASE_URL + "/auth/refresh-token"
}

const signUp = async (username, password, email) => {
    return axios({
        method: "post",
        url: URL.sign_up,
        data: {username, password, email},
        withCredentials: true
    });
}

const signIn = async (username, password) => {
    return axios({
        method: "post",
        url: URL.sign_in,
        data: {username, password},
        withCredentials: true
    })
}

const signOut = async () => {
    return axios({
        method: "post",
        url: URL.sign_out,
        withCredentials: true
    });
}

const verifyUserIsAdmin = async () => {
    return axios({
        method: "get",
        url: URL.verify_admin,
        withCredentials: true
    });
}

const refreshToken = () => {
    return axios({
        method: "get",
        url: URL.refresh_token,
        withCredentials: true
    });
}

const setSignedInToLocalStorage = () => {
    localStorage.setItem(LOCALSTORAGE_KEY, "true");
}

const removeSignedInFromLocalStorage = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY)
}

export {
    signIn,
    signUp,
    signOut,
    refreshToken,
    setSignedInToLocalStorage,
    removeSignedInFromLocalStorage,
    verifyUserIsAdmin,
    LOCALSTORAGE_KEY
}