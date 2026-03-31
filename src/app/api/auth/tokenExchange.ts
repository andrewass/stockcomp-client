export type ResourceTokenResponse = {
	accessToken: string;
	expiresAt: Date;
};

type RawResourceTokenResponse = {
	accessToken?: string;
	expiresAt?: string | number;
	expiresIn?: number;
	expires_in?: number;
};

export const RESOURCE_SERVER_AUDIENCE =
	process.env.RESOURCE_SERVER_AUDIENCE ?? "https://api.stockcomp.local";

function createBody(idToken: string): URLSearchParams {
	return new URLSearchParams({
		grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
		subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
		subject_token: idToken,
		audience: RESOURCE_SERVER_AUDIENCE,
	});
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

export async function exchangeForResourceToken(
	idToken: string,
): Promise<ResourceTokenResponse> {
	const response = await fetch(`${process.env.TOKEN_EXCHANGE_URL}/token`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: createBody(idToken).toString(),
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData = (await response.json()) as RawResourceTokenResponse;
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
