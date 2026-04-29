import "server-only";

export type RequestParams = Record<
	string,
	string | number | boolean | null | undefined
>;

export interface JsonRequestConfig {
	baseUrl: string;
	body?: unknown;
	headers?: HeadersInit;
	method: "GET" | "POST" | "PUT" | "DELETE";
	params?: RequestParams;
	provider: string;
	url: string;
}

export class ApiHttpError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly method: string,
		public readonly url: string,
		public readonly provider: string,
		public readonly responseBody?: string,
	) {
		super(message);
		this.name = "ApiHttpError";
	}
}

export function isApiHttpStatusError(
	error: unknown,
	status: number,
): error is ApiHttpError {
	return error instanceof ApiHttpError && error.status === status;
}

function createUrl(baseUrl: string, url: string, params?: RequestParams): URL {
	const requestUrl = new URL(url, baseUrl);

	if (!params) {
		return requestUrl;
	}

	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === undefined) {
			continue;
		}

		requestUrl.searchParams.set(key, String(value));
	}

	return requestUrl;
}

function createHeaders(headers: HeadersInit | undefined, body: unknown): Headers {
	const requestHeaders = new Headers(headers);
	if (body !== undefined && !requestHeaders.has("Content-Type")) {
		requestHeaders.set("Content-Type", "application/json");
	}

	return requestHeaders;
}

export async function requestJson<T>(config: JsonRequestConfig): Promise<T> {
	const requestUrl = createUrl(config.baseUrl, config.url, config.params);
	const response = await fetch(requestUrl, {
		method: config.method,
		headers: createHeaders(config.headers, config.body),
		body: config.body === undefined ? undefined : JSON.stringify(config.body),
	});

	if (response.status === 204) {
		return null as T;
	}

	const responseBody = await response.text();
	if (!response.ok) {
		throw new ApiHttpError(
			`HTTP error! status: ${response.status}`,
			response.status,
			config.method,
			requestUrl.toString(),
			config.provider,
			responseBody || undefined,
		);
	}

	if (!responseBody) {
		return null as T;
	}

	try {
		return JSON.parse(responseBody) as T;
	} catch (error) {
		throw new Error(
			`Failed to parse JSON response from ${config.provider}: ${
				error instanceof Error ? error.message : "Unknown parse error"
			}`,
		);
	}
}
