import { RedirectType, redirect } from "next/navigation";
import type { Session } from "next-auth";
import { auth } from "../../auth.ts";

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

function extractAccessToken(session: Session): string {
	if (session.provider === "google" && session.idToken) {
		return session.idToken;
	} else {
		throw new Error("Error extracting access token");
	}
}

const request = async <T>(
	config: CustomRequestConfig,
	method: RequestMethod,
): Promise<T> => {
	const session = await auth();
	if (!session) {
		redirect("/api/auth/signin", RedirectType.push);
	}
	const accessToken = extractAccessToken(session);
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
		redirect("/api/auth/signin", RedirectType.push);
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
