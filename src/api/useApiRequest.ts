import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";


export const useApiRequest = (config: AxiosRequestConfig) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    config.headers = {Authorization: "Bearer Bear"}

    useEffect(() => {
        axios(config)
            .then((response) => setData(response.data))
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return {data, error, isLoading};
}