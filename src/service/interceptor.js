import axios from "axios";
import {refreshToken} from "./authService";


const requestInterceptor = axios.interceptors.request.use(config => {
        config.withCredentials = true;
        return config;
    }
);

const responseInterceptor = axios.interceptors.response.use(response => {
        return response;
    },
    async error => {
        if (error.response.status === 401) {
            await refreshToken();
            return axios.request(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);

export {responseInterceptor, requestInterceptor}