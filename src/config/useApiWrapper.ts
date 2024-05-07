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
            for(const item in config.params){
                url.searchParams.set(item, String(config.params[item]))
            }
            const response = await fetch(url, {
                    method: config.method,
                    credentials: "include",
                    body: JSON.stringify(config.body),
                }
            )
            return await response.json();
        }
    }

    const voidRequest = () => {
        return async (config: CustomRequestConfig) => {
            const url = new URL(config.url, "http://stockcomp.io");
            for(const item in config.params){
                url.searchParams.set(item, String(config.params[item]))
            }
            await fetch(url, {
                    method: config.method,
                    credentials: "include",
                    body: JSON.stringify(config.body),
                }
            )
        }
    }

    return {
        apiGet: request(),
        apiPost: request(),
        apiPut: request(),
        apiDelete: request(),
        apiPostVoid: voidRequest(),
        apiDeleteVoid: voidRequest(),
    }
}