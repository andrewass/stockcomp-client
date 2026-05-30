import "server-only";

export type RequestParams = Record<
	string,
	string | number | boolean | null | undefined
>;

type JsonRequestCacheConfig =
	| {
			cache?: RequestCache;
			next?: never;
	  }
	| {
			cache?: never;
			next?: NextFetchRequestConfig;
	  };

interface BaseRequestConfig {
	baseUrl: string;
	headers?: HeadersInit;
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
	params?: RequestParams;
	provider: string;
	signal?: AbortSignal;
	timeoutMs?: number;
	url: string;
}

export type TextRequestConfig = BaseRequestConfig & {
	body?: BodyInit;
} & JsonRequestCacheConfig;

export type JsonRequestConfig = BaseRequestConfig & {
	body?: unknown;
} & JsonRequestCacheConfig;

export interface TextRequestResult {
	requestUrl: string;
	response: Response;
	responseBody: string;
}

export const DEFAULT_REQUEST_TIMEOUT_MS = 15_000;

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

export class ApiJsonParseError extends Error {
	constructor(
		message: string,
		public readonly method: string,
		public readonly url: string,
		public readonly provider: string,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = "ApiJsonParseError";
	}
}

export class ApiRequestTimeoutError extends Error {
	constructor(
		message: string,
		public readonly method: string,
		public readonly url: string,
		public readonly provider: string,
		public readonly timeoutMs: number,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = "ApiRequestTimeoutError";
	}
}

export class ApiRequestAbortedError extends Error {
	constructor(
		message: string,
		public readonly method: string,
		public readonly url: string,
		public readonly provider: string,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = "ApiRequestAbortedError";
	}
}

export class ApiRequestNetworkError extends Error {
	constructor(
		message: string,
		public readonly method: string,
		public readonly url: string,
		public readonly provider: string,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = "ApiRequestNetworkError";
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

function createHeaders(
	headers: HeadersInit | undefined,
	body: unknown,
): Headers {
	const requestHeaders = new Headers(headers);
	if (body !== undefined && !requestHeaders.has("Content-Type")) {
		requestHeaders.set("Content-Type", "application/json");
	}

	return requestHeaders;
}

function hasConflictingCacheConfig(
	config: JsonRequestConfig | TextRequestConfig,
): boolean {
	const cacheConfig = config as {
		cache?: RequestCache;
		next?: NextFetchRequestConfig;
	};

	return cacheConfig.cache !== undefined && cacheConfig.next !== undefined;
}

function createRequestSignal(
	signal: AbortSignal | undefined,
	timeoutMs: number,
): { requestSignal: AbortSignal; timeoutSignal: AbortSignal } {
	if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
		throw new Error(`Invalid request timeout: ${timeoutMs}`);
	}

	const timeoutSignal = AbortSignal.timeout(timeoutMs);
	return {
		requestSignal: signal
			? AbortSignal.any([signal, timeoutSignal])
			: timeoutSignal,
		timeoutSignal,
	};
}

function createRequestError(
	error: unknown,
	config: JsonRequestConfig | TextRequestConfig,
	requestUrl: string,
	timeoutSignal: AbortSignal,
	timeoutMs: number,
): Error {
	if (timeoutSignal.aborted) {
		return new ApiRequestTimeoutError(
			`Request to ${config.provider} timed out after ${timeoutMs}ms`,
			config.method,
			requestUrl,
			config.provider,
			timeoutMs,
			error,
		);
	}

	if (config.signal?.aborted) {
		return new ApiRequestAbortedError(
			`Request to ${config.provider} was aborted`,
			config.method,
			requestUrl,
			config.provider,
			error,
		);
	}

	return new ApiRequestNetworkError(
		`Network error while calling ${config.provider}`,
		config.method,
		requestUrl,
		config.provider,
		error,
	);
}

export async function requestText(
	config: TextRequestConfig,
): Promise<TextRequestResult> {
	const requestUrl = createUrl(config.baseUrl, config.url, config.params);
	if (hasConflictingCacheConfig(config)) {
		throw new Error(
			`Invalid fetch cache configuration for ${config.provider}: use either cache or next, not both.`,
		);
	}

	const timeoutMs = config.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
	const { requestSignal, timeoutSignal } = createRequestSignal(
		config.signal,
		timeoutMs,
	);

	try {
		const response = await fetch(requestUrl, {
			method: config.method,
			cache: config.cache,
			next: config.next,
			headers: config.headers,
			body: config.body,
			signal: requestSignal,
		});
		const responseBody = await response.text();

		return {
			requestUrl: requestUrl.toString(),
			response,
			responseBody,
		};
	} catch (error) {
		throw createRequestError(
			error,
			config,
			requestUrl.toString(),
			timeoutSignal,
			timeoutMs,
		);
	}
}

export async function requestJson<T>(config: JsonRequestConfig): Promise<T> {
	const { requestUrl, response, responseBody } = await requestText({
		...config,
		headers: createHeaders(config.headers, config.body),
		body: config.body === undefined ? undefined : JSON.stringify(config.body),
	});

	if (response.status === 204) {
		return null as T;
	}

	if (!response.ok) {
		throw new ApiHttpError(
			`HTTP error! status: ${response.status}`,
			response.status,
			config.method,
			requestUrl,
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
		throw new ApiJsonParseError(
			`Failed to parse JSON response from ${config.provider}: ${
				error instanceof Error ? error.message : "Unknown parse error"
			}`,
			config.method,
			requestUrl,
			config.provider,
			error,
		);
	}
}
