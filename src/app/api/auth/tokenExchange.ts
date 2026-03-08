export type ResourceTokenResponse = {
	accessToken: string;
	expiresAt: Date;
};

function createBody(idToken: string): URLSearchParams {
	return new URLSearchParams({
		grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
		subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
		subject_token: idToken,
		audience: "https://api.stockcomp.local",
	});
}

export async function exchangeForResourceToken(
	idToken: string,
): Promise<ResourceTokenResponse> {
	const response = await fetch(`${process.env.TOKEN_EXCHANGE_URL}/tokens`, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: createBody(idToken).toString(),
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData = await response.json();
	return responseData as ResourceTokenResponse;
}
