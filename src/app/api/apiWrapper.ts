import "server-only";
import { headers } from "next/headers";
import {
	exchangeForResourceToken,
	RESOURCE_SERVER_AUDIENCE,
} from "@/api/auth/tokenExchange.ts";
import { auth } from "@/auth.ts";
import {
	getValidResourceToken,
	saveResourceToken,
} from "@/resourceTokenStore.ts";

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

async function getResourceAccessToken(): Promise<string> {
	const requestHeaders = await headers();
	const session = await auth.api.getSession({ headers: requestHeaders });
	if (!session) throw new Error("No session found");

	const userId = session.user.id;
	const cachedToken = getValidResourceToken(userId, RESOURCE_SERVER_AUDIENCE);
	if (cachedToken) {
		return cachedToken;
	}

	const { idToken } = await auth.api.getAccessToken({
		body: { providerId: "google" },
		headers: requestHeaders,
	});
	if (!idToken) throw new Error("No Google ID token found");

	const { accessToken, expiresAt } = await exchangeForResourceToken(idToken);
	saveResourceToken({
		userId,
		audience: RESOURCE_SERVER_AUDIENCE,
		accessToken,
		expiresAt,
	});

	return accessToken;
}

const request = async <T>(
	config: CustomRequestConfig,
	method: RequestMethod,
): Promise<T> => {
	const resourceAccessToken = await getResourceAccessToken();

	const baseUrl = process.env.RESOURCE_SERVER_BASE_URL;
	if (!baseUrl) {
		throw new Error("RESOURCE_SERVER_BASE_URL is not configured");
	}

	const url = new URL(config.url, baseUrl);
	if (config.params) {
		for (const item in config.params) {
			url.searchParams.set(item, String(config.params[item]));
		}
	}

	const response = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${resourceAccessToken}`,
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
