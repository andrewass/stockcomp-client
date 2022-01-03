import axios from "axios";
import {BASE_URL} from "./serviceConfig";


const URL = {
    updateDetails: BASE_URL + "/user/update-details",
    getDetails: BASE_URL+"/user/get-details"
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