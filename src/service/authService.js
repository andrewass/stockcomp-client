import axios from "axios";
import {CONTEST_BASE_URL} from "./serviceConfig";

const LOCALSTORAGE_KEY = "isSignedInStockComp";

const URL = {
    sign_in: CONTEST_BASE_URL + "/auth/sign-in",
    sign_up: CONTEST_BASE_URL + "/auth/sign-up",
    sign_out: CONTEST_BASE_URL + "/auth/sign-out",
    verify_admin: CONTEST_BASE_URL + "/auth/verify-admin",
    refresh_token: CONTEST_BASE_URL + "/auth/refresh-token"
}

const signUp = async (username, password, email) => {
    return axios({
        method: "post",
        url: URL.sign_up,
        data: {username, password, email},
        withCredentials: true
    });
}

const signIn = (credentials) => {
    return axios({
        method: "post",
        url: URL.sign_in,
        data: credentials,
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