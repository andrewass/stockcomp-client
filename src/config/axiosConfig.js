import axios from "axios";
import {AUTH_SERVER_URL, CLIENT_ID} from "./properties";

export const axiosContest = axios.create({})
const sessionStorageKey = "oidc.user:"+AUTH_SERVER_URL+":"+CLIENT_ID

const requestInterceptor = axiosContest.interceptors.request.use(request => {
        const storageData = sessionStorage.getItem(sessionStorageKey)
        request.withCredentials = true
        if(storageData) {
            const {access_token} = JSON.parse(storageData)
            request.headers.Authorization = "Bearer "+access_token
        }
        return request;
    }, error => {
        return Promise.reject(error)
    }
);

const responseInterceptor = axiosContest.interceptors.response.use(response => {
        return response;
    }, async error => {
        console.log(JSON.stringify(error))
        return Promise.reject(error)
    }
);

export {responseInterceptor, requestInterceptor}