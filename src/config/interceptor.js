import axios from "axios";


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
        console.log(JSON.stringify(error))
        return Promise.reject(error);

    }
);

export {responseInterceptor, requestInterceptor}