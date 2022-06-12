import axios from "axios";
import {CONTEST_BASE_URL} from "../config/serviceConfig";


const URL = {
    updateDetails: CONTEST_BASE_URL + "/user/update-details",
    getDetails: CONTEST_BASE_URL + "/user/get-details"
}

const updateUserDetails = async (userDetails) => {
    return axios({
        method: "put",
        url: URL.updateDetails,
        data: userDetails,
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