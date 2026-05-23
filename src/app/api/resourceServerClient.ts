import "server-only";
import {
	deleteResourceAccessTokenForCurrentUser,
	getResourceAccessTokenForCurrentUser,
} from "@/api/auth/tokens/resourceTokenProvider.ts";
import { getResourceServerBaseUrl } from "@/api/auth/tokens/tokenConfig.ts";
import {
	createUnauthenticatedError,
	isUnauthenticatedError,
} from "@/api/auth/tokens/tokenErrors.ts";
import {
	isApiHttpStatusError,
	type RequestParams,
	requestJson,
} from "@/api/httpClient.ts";

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

export interface ResourceRequestConfig {
	url: string;
	body?: RequestBody;
	params?: RequestParams;
}

export { isUnauthenticatedError };

const request = async <T>(
	config: ResourceRequestConfig,
	method: RequestMethod,
): Promise<T> => {
	const baseUrl = getResourceServerBaseUrl();

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
		return await executeRequest(await getResourceAccessTokenForCurrentUser());
	} catch (error) {
		if (!isApiHttpStatusError(error, 401)) {
			throw error;
		}

		await deleteResourceAccessTokenForCurrentUser();

		try {
			return await executeRequest(
				await getResourceAccessTokenForCurrentUser(true),
			);
		} catch (retryError) {
			if (isApiHttpStatusError(retryError, 401)) {
				throw createUnauthenticatedError();
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
