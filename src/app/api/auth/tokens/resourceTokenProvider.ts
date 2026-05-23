import "server-only";
import { headers } from "next/headers";
import { getGoogleSubjectTokenForUser } from "@/api/auth/tokens/googleSubjectTokenProvider.ts";
import {
	deleteResourceToken,
	getValidResourceToken,
	saveResourceToken,
} from "@/api/auth/tokens/resourceTokenStore.ts";
import { getResourceServerAudience } from "@/api/auth/tokens/tokenConfig.ts";
import {
	createUnauthenticatedError,
	TokenRefreshError,
} from "@/api/auth/tokens/tokenErrors.ts";
import { exchangeForResourceToken } from "@/api/auth/tokens/tokenExchangeClient.ts";
import { auth } from "@/lib/auth.ts";

async function getCurrentUserId(requestHeaders: Headers): Promise<string> {
	const session = await auth.api.getSession({ headers: requestHeaders });
	if (!session) {
		throw createUnauthenticatedError();
	}

	return session.user.id;
}

async function getSubjectToken(
	userId: string,
	requestHeaders: Headers,
): Promise<string> {
	let subjectToken: string | null;
	try {
		subjectToken = await getGoogleSubjectTokenForUser(userId, requestHeaders);
	} catch (error) {
		if (
			error instanceof TokenRefreshError &&
			error.errorCode === "invalid_grant"
		) {
			throw createUnauthenticatedError();
		}

		throw error;
	}

	if (!subjectToken) {
		throw createUnauthenticatedError();
	}

	return subjectToken;
}

export async function getResourceAccessTokenForCurrentUser(
	forceRefresh = false,
): Promise<string> {
	const requestHeaders = await headers();
	const userId = await getCurrentUserId(requestHeaders);
	const audience = getResourceServerAudience();
	const cachedToken = forceRefresh
		? null
		: getValidResourceToken(userId, audience);
	if (cachedToken) {
		return cachedToken;
	}

	const subjectToken = await getSubjectToken(userId, requestHeaders);
	const { accessToken, expiresAt } =
		await exchangeForResourceToken(subjectToken);
	saveResourceToken({
		userId,
		audience,
		accessToken,
		expiresAt,
	});

	return accessToken;
}

export async function deleteResourceAccessTokenForCurrentUser(): Promise<void> {
	const requestHeaders = await headers();
	const userId = await getCurrentUserId(requestHeaders);
	deleteResourceToken(userId, getResourceServerAudience());
}
