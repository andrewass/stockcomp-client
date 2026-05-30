import "server-only";
import {
	getResourceServerAudience,
	getTokenExchangeUrl,
} from "@/api/auth/tokens/tokenConfig.ts";
import { ApiJsonParseError, requestText } from "@/api/httpClient.ts";

export interface ResourceTokenResponse {
	accessToken: string;
	expiresAt: Date;
}

interface RawResourceTokenResponse {
	accessToken?: string;
	expiresAt?: string | number;
	expiresIn?: number;
	expires_in?: number;
}

interface TokenExchangeErrorResponse {
	error?: string;
	error_description?: string;
}

export class TokenExchangeHttpError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly errorCode?: string,
		public readonly errorDescription?: string,
		public readonly requestId?: string,
	) {
		super(message);
		this.name = "TokenExchangeHttpError";
	}
}

function createBody(subjectToken: string, audience: string): URLSearchParams {
	return new URLSearchParams({
		grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
		subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
		subject_token: subjectToken,
		audience,
	});
}

function getTokenExchangeBaseUrl(): string {
	return `${getTokenExchangeUrl().replace(/\/+$/, "")}/`;
}

function parseExpiresAt(responseData: RawResourceTokenResponse): Date {
	if (responseData.expiresAt !== undefined) {
		if (typeof responseData.expiresAt === "number") {
			const timestampMs =
				responseData.expiresAt > 10_000_000_000
					? responseData.expiresAt
					: responseData.expiresAt * 1000;
			return new Date(timestampMs);
		}

		return new Date(responseData.expiresAt);
	}

	const expiresIn = responseData.expiresIn ?? responseData.expires_in;
	if (typeof expiresIn === "number") {
		return new Date(Date.now() + expiresIn * 1000);
	}

	throw new Error("Token exchange response did not include expiration");
}

function readTokenExchangeError(
	responseBody: string,
): TokenExchangeErrorResponse {
	if (!responseBody) {
		return {};
	}

	try {
		return JSON.parse(responseBody) as TokenExchangeErrorResponse;
	} catch {
		return {
			error_description: responseBody,
		};
	}
}

function parseTokenExchangeResponse(
	responseBody: string,
	requestUrl: string,
): RawResourceTokenResponse {
	try {
		return JSON.parse(responseBody) as RawResourceTokenResponse;
	} catch (error) {
		throw new ApiJsonParseError(
			"Failed to parse JSON response from token-exchange",
			"POST",
			requestUrl,
			"token-exchange",
			error,
		);
	}
}

export async function exchangeForResourceToken(
	subjectToken: string,
): Promise<ResourceTokenResponse> {
	const audience = getResourceServerAudience();
	const { requestUrl, response, responseBody } = await requestText({
		baseUrl: getTokenExchangeBaseUrl(),
		url: "token",
		provider: "token-exchange",
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: createBody(subjectToken, audience),
	});
	if (!response.ok) {
		const errorResponse = readTokenExchangeError(responseBody);
		const requestId = response.headers.get("x-request-id") ?? undefined;
		const detail = [
			errorResponse.error,
			errorResponse.error_description,
			requestId ? `requestId=${requestId}` : undefined,
		]
			.filter(Boolean)
			.join(": ");

		throw new TokenExchangeHttpError(
			`Token exchange failed with status ${response.status}${
				detail ? `: ${detail}` : ""
			}`,
			response.status,
			errorResponse.error,
			errorResponse.error_description,
			requestId,
		);
	}

	const responseData = parseTokenExchangeResponse(responseBody, requestUrl);
	if (!responseData.accessToken) {
		throw new Error("Token exchange response did not include accessToken");
	}

	const expiresAt = parseExpiresAt(responseData);
	if (Number.isNaN(expiresAt.getTime())) {
		throw new Error(
			"Token exchange response included an invalid expiresAt value",
		);
	}

	return {
		accessToken: responseData.accessToken,
		expiresAt,
	};
}
