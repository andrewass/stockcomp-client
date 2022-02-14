import axios from "axios";
import {CONTEST_BASE_URL, graphqlClientStockData} from "../config/ServiceConfig";
import {useQuery} from "react-query";
import {gql} from "graphql-request";


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

const useGetUserDetailsSimple = (username) => {
    return useQuery(["getUserDetailsSimple", username], async () => {
        return await graphqlClientStockData.request(
            gql`
                query GetUserDetailsSimple($username: String!) {
                    getUserDetails(username: $username){
                        id
                        username
                        fullName
                        country
                    }
                }
            `, {username});
    });
}
export {
    updateUserDetails, getUserDetails, useGetUserDetailsSimple
}