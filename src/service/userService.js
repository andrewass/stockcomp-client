import axios from "axios";
import {CONTEST_BASE_URL} from "./serviceConfig";


const URL = {
    updateDetails: CONTEST_BASE_URL + "/user/update-details",
    getDetails: CONTEST_BASE_URL+"/user/get-details"
}

const updateUserDetails = async (username, fullName, country) => {
    return axios({
        method: "put",
        url: URL.updateDetails,
        data: {username, fullName, country},
        withCredentials: true
    });
};

const getUserDetails = (username) => {
    return axios({
        method: "get",
        url: URL.getDetails,
        params: {username},
        withCredentials: true
    });
}

export {
    updateUserDetails, getUserDetails
}