import axios from "axios";

const responseInterceptor = axios.interceptors.response.use(
    response => {
        console.log("Logging a fulfilled response");
        return response;
    },
    error => {
        console.log("Logging a rejected response "+error);
    }
);

export default responseInterceptor