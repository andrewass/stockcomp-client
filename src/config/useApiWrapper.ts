import axios, {AxiosRequestConfig} from "axios";

export const useApiWrapper = () => {

    const request = () => {
        return async (config: AxiosRequestConfig) => {
            config.withCredentials = true
            const response = await axios(config);
            return response.data;
        }
    }

    return {
        apiGet: request(),
        apiPost: request(),
        apiPut: request(),
        apiDelete: request()
    }
}