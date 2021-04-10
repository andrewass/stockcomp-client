import axios from "axios";

const URL = {
    sign_in: "http://localhost:8080/auth/sign-in",
    sign_up: "http://localhost:8080/auth/sign-up",
    sign_out: "http://localhost:8080/auth/sign-out"
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
    return await axios.post(URL.sign_in, {username, password,});
};

const signOut = async (username) => {
    return axios({
        method: "post",
        url: URL.sign_out,
        params: {username},
        withCredentials: true
    });
};

const getSignedInUser = () => {
    return JSON.parse(localStorage.getItem("user"))
};

const updateLocalStorage = (username, isSignedIn) => {
    localStorage.setItem("username", username);
    localStorage.setItem("isSignedIn", isSignedIn);
};

export default {
    signIn,
    signUp,
    signOut,
    getSignedInUser,
    updateLocalStorage
};