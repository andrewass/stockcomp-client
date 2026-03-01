import { headers } from "next/headers";
import { auth } from "@/auth.ts";

interface RequestParams {
	[key: string]: string | number;
}

interface RequestBody {
	[key: string]: string | number;
}

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export interface CustomRequestConfig {
	url: string;
	body?: RequestBody;
	params?: RequestParams;
}

async function extractAccessToken(): Promise<string> {
	const { idToken } = await auth.api.getAccessToken({
		body: {
			providerId: "google",
		},
		headers: await headers(),
	});
	if (!idToken) throw new Error("No access token found");
	return idToken;
}

const request = async <T>(
	config: CustomRequestConfig,
	method: RequestMethod,
): Promise<T> => {
	const accessToken = await extractAccessToken();

	const url = new URL(config.url, process.env.RESOURCE_SERVER_BASE_URL);
	for (const item in config.params) {
		url.searchParams.set(item, String(config.params[item]));
	}

	const response = await fetch(url, {
		method: method,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: config.body ? JSON.stringify(config.body) : undefined,
	});

	if (response.status === 401) {
		throw new Error("UNAUTHORIZED");
	}
	if (response.status === 204) return null as T;
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const responseData = await response.text();
	return responseData ? JSON.parse(responseData) : (null as T);
};

export const apiGet = <T>(config: CustomRequestConfig): Promise<T> =>
	request(config, RequestMethod.GET);
export const apiPost = <T>(config: CustomRequestConfig): Promise<T> =>
	request(config, RequestMethod.POST);
export const apiPut = <T>(config: CustomRequestConfig): Promise<T> =>
	request(config, RequestMethod.PUT);
export const apiDelete = <T>(config: CustomRequestConfig): Promise<T> =>
	request(config, RequestMethod.DELETE);
