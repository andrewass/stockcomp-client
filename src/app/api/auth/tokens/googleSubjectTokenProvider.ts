import "server-only";
import {
	getGoogleRefreshTokenForUser,
	saveGoogleAccountTokens,
} from "@/api/auth/tokens/googleAccountTokenStore.ts";
import {
	getGoogleClientId,
	getGoogleClientSecret,
} from "@/api/auth/tokens/tokenConfig.ts";
import { TokenRefreshError } from "@/api/auth/tokens/tokenErrors.ts";
import { auth } from "@/lib/auth.ts";

interface GoogleRefreshTokenResponse {
	access_token?: string;
	error?: string;
	error_description?: string;
	expires_in?: number;
	id_token?: string;
	refresh_token?: string;
}

interface JwtPayload {
	aud?: string | string[];
	exp?: number;
	iss?: string;
}

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const TOKEN_EXPIRY_BUFFER_MS = 60_000;
const GOOGLE_ISSUERS = new Set([
	"https://accounts.google.com",
	"accounts.google.com",
]);

function decodeJwtPayload(token: string): JwtPayload | null {
	const payloadSegment = token.split(".")[1];
	if (!payloadSegment) {
		return null;
	}

	try {
		return JSON.parse(
			Buffer.from(payloadSegment, "base64url").toString("utf-8"),
		) as JwtPayload;
	} catch {
		return null;
	}
}

function hasExpectedAudience(payload: JwtPayload, audience: string): boolean {
	const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
	return audiences.includes(audience);
}

function isGoogleIdTokenUsable(
	token: string,
	bufferMs = TOKEN_EXPIRY_BUFFER_MS,
): boolean {
	const payload = decodeJwtPayload(token);
	if (!payload?.iss || !GOOGLE_ISSUERS.has(payload.iss)) {
		return false;
	}

	if (!hasExpectedAudience(payload, getGoogleClientId())) {
		return false;
	}

	return (
		typeof payload.exp === "number" &&
		payload.exp * 1000 - bufferMs > Date.now()
	);
}

function parseGoogleTokenResponse(
	responseBody: string,
): GoogleRefreshTokenResponse {
	if (!responseBody) {
		return {};
	}

	try {
		return JSON.parse(responseBody) as GoogleRefreshTokenResponse;
	} catch {
		return {
			error: "invalid_response",
			error_description: "Google token endpoint returned invalid JSON.",
		};
	}
}

async function refreshGoogleTokens(
	refreshToken: string,
): Promise<GoogleRefreshTokenResponse> {
	const response = await fetch(GOOGLE_TOKEN_URL, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: getGoogleClientId(),
			client_secret: getGoogleClientSecret(),
			refresh_token: refreshToken,
			grant_type: "refresh_token",
		}).toString(),
	});

	const responseBody = await response.text();
	const responseData = parseGoogleTokenResponse(responseBody);
	if (!response.ok) {
		throw new TokenRefreshError(
			`Google token refresh failed with status ${response.status}`,
			response.status,
			responseData.error,
			responseData.error_description,
		);
	}

	return responseData;
}

async function refreshGoogleIdTokenForUser(
	userId: string,
): Promise<string | null> {
	const refreshToken = getGoogleRefreshTokenForUser(userId);
	if (!refreshToken) {
		return null;
	}

	const refreshed = await refreshGoogleTokens(refreshToken);
	if (!refreshed.access_token || !refreshed.id_token || !refreshed.expires_in) {
		return null;
	}

	if (!isGoogleIdTokenUsable(refreshed.id_token)) {
		return null;
	}

	saveGoogleAccountTokens({
		userId,
		accessToken: refreshed.access_token,
		accessTokenExpiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
		idToken: refreshed.id_token,
		refreshToken: refreshed.refresh_token,
	});

	return refreshed.id_token;
}

export async function getGoogleSubjectTokenForUser(
	userId: string,
	requestHeaders: Headers,
): Promise<string | null> {
	const { idToken } = await auth.api.getAccessToken({
		body: { providerId: "google" },
		headers: requestHeaders,
	});

	if (idToken && isGoogleIdTokenUsable(idToken)) {
		return idToken;
	}

	return refreshGoogleIdTokenForUser(userId);
}
