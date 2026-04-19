import "server-only";
import { headers } from "next/headers";
import {
	exchangeForResourceToken,
	RESOURCE_SERVER_AUDIENCE,
} from "@/api/auth/tokenExchange.ts";
import { auth } from "@/lib/auth.ts";
import {
	deleteResourceToken,
	getValidResourceToken,
	saveResourceToken,
} from "@/lib/resourceTokenStore.ts";

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

const UNAUTHENTICATED_ERROR = "UNAUTHENTICATED";

export interface CustomRequestConfig {
	url: string;
	body?: RequestBody;
	params?: RequestParams;
}

export function isUnauthenticatedError(error: unknown): boolean {
	return error instanceof Error && error.message === UNAUTHENTICATED_ERROR;
}

async function getResourceAccessTokenForUser(forceRefresh = false): Promise<string> {
	const requestHeaders = await headers();
	const session = await auth.api.getSession({ headers: requestHeaders });
	if (!session) throw new Error(UNAUTHENTICATED_ERROR);

	const userId = session.user.id;
	const cachedToken = forceRefresh
		? null
		: getValidResourceToken(userId, RESOURCE_SERVER_AUDIENCE);
	if (cachedToken) {
		return cachedToken;
	}

	const { idToken } = await auth.api.getAccessToken({
		body: { providerId: "google" },
		headers: requestHeaders,
	});
	if (!idToken) throw new Error(UNAUTHENTICATED_ERROR);

	const { accessToken, expiresAt } = await exchangeForResourceToken(idToken);
	saveResourceToken({
		userId,
		audience: RESOURCE_SERVER_AUDIENCE,
		accessToken,
		expiresAt,
	});

	return accessToken;
}

async function getSessionUserId(): Promise<string> {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) throw new Error(UNAUTHENTICATED_ERROR);

	return session.user.id;
}

const request = async <T>(
	config: CustomRequestConfig,
	method: RequestMethod,
): Promise<T> => {
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

	const executeRequest = async (resourceAccessToken: string) =>
		fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${resourceAccessToken}`,
			"Content-Type": "application/json",
		},
		body: config.body ? JSON.stringify(config.body) : undefined,
	});

	let response = await executeRequest(await getResourceAccessTokenForUser());

	if (response.status === 401) {
		const userId = await getSessionUserId();
		deleteResourceToken(userId, RESOURCE_SERVER_AUDIENCE);

		response = await executeRequest(
			await getResourceAccessTokenForUser(true),
		);

		if (response.status === 401) {
			throw new Error(UNAUTHENTICATED_ERROR);
		}
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
