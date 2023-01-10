import {useAuth} from "react-oidc-context";
import axios, {AxiosRequestConfig} from "axios";

export const useApiWrapper = () => {
    const auth = useAuth()

    function request() {
        return async (config: AxiosRequestConfig) => {
            config.headers = {Authorization: "Bearer " + auth.user?.access_token}
            const response = await axios(config)
            return response.data
        }
    }

    return {
        apiGet: request(),
        apiPost: request(),
        apiPut: request(),
        apiDelete: request()
    }
}