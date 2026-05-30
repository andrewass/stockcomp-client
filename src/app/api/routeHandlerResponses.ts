import "server-only";
import { isUnauthenticatedError } from "@/api/auth/tokens/tokenErrors.ts";
import { isApiHttpStatusError } from "@/api/httpClient.ts";

const DEFAULT_AUTHENTICATION_MESSAGE = "Authentication required.";
const DEFAULT_INVALID_JSON_MESSAGE = "Invalid JSON body.";
const DEFAULT_FALLBACK_STATUS = 502;
const DEFAULT_PASSTHROUGH_STATUSES = [400, 403, 404, 409, 422] as const;

type ErrorBodyFactory = (message: string) => unknown;

export interface RouteErrorResponseOptions {
	message: string;
	authenticationMessage?: string;
	createBody?: ErrorBodyFactory;
	fallbackStatus?: number;
	passthroughStatuses?: readonly number[];
}

export interface JsonRequestBodyParseOptions {
	createBody?: ErrorBodyFactory;
	message?: string;
}

type ParsedJsonRequestBody<TBody> =
	| {
			body: TBody;
			ok: true;
	  }
	| {
			ok: false;
			response: Response;
	  };

function createDefaultErrorBody(message: string): { message: string } {
	return { message };
}

function createErrorResponse(
	message: string,
	status: number,
	createBody?: ErrorBodyFactory,
): Response {
	return Response.json((createBody ?? createDefaultErrorBody)(message), {
		status,
	});
}

function getPassthroughStatus(
	error: unknown,
	statuses: readonly number[],
): number | null {
	for (const status of statuses) {
		if (isApiHttpStatusError(error, status)) {
			return status;
		}
	}

	return null;
}

export function toRouteErrorResponse(
	error: unknown,
	options: RouteErrorResponseOptions,
): Response {
	if (isUnauthenticatedError(error)) {
		return createErrorResponse(
			options.authenticationMessage ?? DEFAULT_AUTHENTICATION_MESSAGE,
			401,
			options.createBody,
		);
	}

	return createErrorResponse(
		options.message,
		getPassthroughStatus(
			error,
			options.passthroughStatuses ?? DEFAULT_PASSTHROUGH_STATUSES,
		) ??
			options.fallbackStatus ??
			DEFAULT_FALLBACK_STATUS,
		options.createBody,
	);
}

export async function parseJsonRequestBody<TBody>(
	request: Request,
	options: JsonRequestBodyParseOptions = {},
): Promise<ParsedJsonRequestBody<TBody>> {
	try {
		return {
			body: (await request.json()) as TBody,
			ok: true,
		};
	} catch {
		return {
			ok: false,
			response: createErrorResponse(
				options.message ?? DEFAULT_INVALID_JSON_MESSAGE,
				400,
				options.createBody,
			),
		};
	}
}
