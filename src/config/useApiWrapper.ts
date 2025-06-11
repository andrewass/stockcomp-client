interface RequestParams {
    [key: string]: string | number
}

interface RequestBody {
    [key: string]: string | number
}

export interface CustomRequestConfig {
    url: string
    method: string
    body?: RequestBody
    params?: RequestParams
}

export const useApiWrapper = () => {

    const request = () => {
        return async (config: CustomRequestConfig) => {
            const url = new URL(config.url, "http://stockcomp.io");
            for (const item in config.params) {
                url.searchParams.set(item, String(config.params[item]))
            }
            const response = await fetch(url, {
                    method: config.method,
                    credentials: "include",
                    body: JSON.stringify(config.body),
                }
            )
            if (response.status === 204) {
                return null
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.text();
            if (responseData) {
                return JSON.parse(responseData);
            }
        }
    }

    return {
        apiGet: request(),
        apiPost: request(),
        apiPut: request(),
        apiDelete: request(),
    }
}
