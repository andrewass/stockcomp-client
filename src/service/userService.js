import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    updateDetails: baseUrl + "/user/update-details",
    getDetails: baseUrl+"/user/get-details"
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