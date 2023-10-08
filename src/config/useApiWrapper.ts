import {useAuth} from "react-oidc-context";
import axios, {AxiosRequestConfig} from "axios";
import {CONTEST_SERVER_BASE_URL} from "./properties";

export const useApiWrapper = () => {
    const auth = useAuth();

    const request = () => {
        return async (config: AxiosRequestConfig) => {
            if (config.url?.startsWith(CONTEST_SERVER_BASE_URL)) {
                config.headers = {Authorization: "Bearer " + auth.user?.access_token}
            }
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