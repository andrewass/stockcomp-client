import axios from "axios";
import {refreshToken} from "./authService";

let isRefreshingToken = false;
let requestQueue = [];

const resendRequests = () => {
    requestQueue.forEach(config => axios.request(config));
    requestQueue = [];
}

const requestInterceptor = axios.interceptors.request.use(request => {
        request.withCredentials = true;
        return request;
    }, error => {
        return Promise.reject(error);
    }
);

const responseInterceptor = axios.interceptors.response.use(response => {
        return response;
    }, async error => {
        const {config, response: {status}} = error
        if (status === 401) {
            requestQueue.push(config)
            if (!isRefreshingToken) {
                isRefreshingToken = true;
                await refreshToken();
                isRefreshingToken = false;
                resendRequests();
            }
        } else {
            return Promise.reject(error);
        }
    }
);

export {responseInterceptor, requestInterceptor}