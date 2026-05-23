import "server-only";

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`${name} is not configured`);
	}

	return value;
}

export function getGoogleClientId(): string {
	return requireEnv("GOOGLE_CLIENT_ID");
}

export function getGoogleClientSecret(): string {
	return requireEnv("GOOGLE_CLIENT_SECRET");
}

export function getResourceServerAudience(): string {
	return requireEnv("RESOURCE_SERVER_AUDIENCE");
}

export function getResourceServerBaseUrl(): string {
	return requireEnv("RESOURCE_SERVER_BASE_URL");
}

export function getTokenExchangeUrl(): string {
	return requireEnv("TOKEN_EXCHANGE_URL");
}
