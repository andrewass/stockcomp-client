import "server-only";
import { headers } from "next/headers";
import {
	exchangeForResourceToken,
	RESOURCE_SERVER_AUDIENCE,
} from "@/api/auth/tokenExchange.ts";
import {
	isApiHttpStatusError,
	requestJson,
	type RequestParams,
} from "@/api/httpClient.ts";
import { auth } from "@/lib/auth.ts";
import {
	deleteResourceToken,
	getValidResourceToken,
	saveResourceToken,
} from "@/lib/resourceTokenStore.ts";

interface RequestBody {
	[key: string]: unknown;
}

enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

const PROVIDER = "resource-server";
const UNAUTHENTICATED_ERROR = "UNAUTHENTICATED";

export interface ResourceRequestConfig {
	url: string;
	body?: RequestBody;
	params?: RequestParams;
}

export function isUnauthenticatedError(error: unknown): boolean {
	return error instanceof Error && error.message === UNAUTHENTICATED_ERROR;
}

async function getResourceAccessTokenForUser(
	forceRefresh = false,
): Promise<string> {
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
	config: ResourceRequestConfig,
	method: RequestMethod,
): Promise<T> => {
	const baseUrl = process.env.RESOURCE_SERVER_BASE_URL;
	if (!baseUrl) {
		throw new Error("RESOURCE_SERVER_BASE_URL is not configured");
	}

	const executeRequest = async (resourceAccessToken: string) =>
		requestJson<T>({
			baseUrl,
			method,
			provider: PROVIDER,
			url: config.url,
			params: config.params,
			body: config.body,
			headers: {
				Authorization: `Bearer ${resourceAccessToken}`,
			},
		});

	try {
		return await executeRequest(await getResourceAccessTokenForUser());
	} catch (error) {
		if (!isApiHttpStatusError(error, 401)) {
			throw error;
		}

		const userId = await getSessionUserId();
		deleteResourceToken(userId, RESOURCE_SERVER_AUDIENCE);

		try {
			return await executeRequest(await getResourceAccessTokenForUser(true));
		} catch (retryError) {
			if (isApiHttpStatusError(retryError, 401)) {
				throw new Error(UNAUTHENTICATED_ERROR);
			}

			throw retryError;
		}
	}
};

export const resourceGet = <T>(config: ResourceRequestConfig): Promise<T> =>
	request(config, RequestMethod.GET);
export const resourcePost = <T>(config: ResourceRequestConfig): Promise<T> =>
	request(config, RequestMethod.POST);
export const resourcePut = <T>(config: ResourceRequestConfig): Promise<T> =>
	request(config, RequestMethod.PUT);
export const resourceDelete = <T>(config: ResourceRequestConfig): Promise<T> =>
	request(config, RequestMethod.DELETE);
