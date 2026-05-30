import "server-only";

const UNAUTHENTICATED_ERROR = "UNAUTHENTICATED";

export function createUnauthenticatedError(): Error {
	return new Error(UNAUTHENTICATED_ERROR);
}

export function isUnauthenticatedError(error: unknown): boolean {
	return error instanceof Error && error.message === UNAUTHENTICATED_ERROR;
}

export class TokenRefreshError extends Error {
	constructor(
		message: string,
		public readonly status: number,
		public readonly errorCode?: string,
		public readonly errorDescription?: string,
		cause?: unknown,
	) {
		super(message, { cause });
		this.name = "TokenRefreshError";
	}
}
