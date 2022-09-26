import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {useAuth} from "react-oidc-context";


export const useApiRequest = (config: AxiosRequestConfig) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const auth = useAuth();

    config.headers = {Authorization: "Bearer "+auth.user?.access_token}

    useEffect(() => {
        axios(config)
            .then((response) => setData(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return {data, error, isLoading};
}