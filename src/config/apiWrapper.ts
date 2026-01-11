interface RequestParams {
	[key: string]: string | number;
}

interface RequestBody {
	[key: string]: string | number;
}

export interface CustomRequestConfig {
	url: string;
	method: string;
	body?: RequestBody;
	params?: RequestParams;
}

const request = async (config: CustomRequestConfig) => {
	const url = new URL(config.url, process.env.NEXT_PUBLIC_BASE_URL);
	for (const item in config.params) {
		url.searchParams.set(item, String(config.params[item]));
	}

	const response = await fetch(url, {
		method: config.method,
		credentials: "include",
		body: JSON.stringify(config.body),
	});
	if (response.status === 204) return null;
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const responseData = await response.text();
	return responseData ? JSON.parse(responseData) : null;
};

export const apiGet = (config: CustomRequestConfig) => request(config);
export const apiPost = (config: CustomRequestConfig) => request(config);
export const apiPut = (config: CustomRequestConfig) => request(config);
export const apiDelete = (config: CustomRequestConfig) => request(config);
