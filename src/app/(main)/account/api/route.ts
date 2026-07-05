import {
	getAccountSettings,
	updateAccountSettings,
} from "@/account/accountData.ts";
import type {
	UpdateAccountSettingsRequest,
	UpdateAccountSettingsResult,
} from "@/account/accountTypes.ts";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import {
	parseJsonRequestBody,
	toRouteErrorResponse,
} from "@/api/routeHandlerResponses.ts";

interface UpdateAccountSettingsBody {
	username?: unknown;
	fullName?: unknown;
	country?: unknown;
}

function normalizeOptionalString(value: unknown): string | null {
	if (typeof value !== "string") {
		return null;
	}

	const trimmedValue = value.trim();
	return trimmedValue ? trimmedValue : null;
}

function createAccountErrorBody(message: string): UpdateAccountSettingsResult {
	return {
		ok: false,
		message,
	};
}

function validateUpdateAccountSettingsBody(
	body: UpdateAccountSettingsBody,
): UpdateAccountSettingsResult & { request?: UpdateAccountSettingsRequest } {
	const username =
		typeof body.username === "string" ? body.username.trim() : "";
	const fullName = normalizeOptionalString(body.fullName);
	const country = normalizeOptionalString(body.country);
	const fieldErrors: Record<string, string> = {};

	if (!username) {
		fieldErrors.username = "Username is required.";
	} else if (username.length > 50) {
		fieldErrors.username = "Username must be 50 characters or fewer.";
	}

	if (fullName && fullName.length > 100) {
		fieldErrors.fullName = "Full name must be 100 characters or fewer.";
	}

	if (country && country.length > 100) {
		fieldErrors.country = "Country must be 100 characters or fewer.";
	}

	if (Object.keys(fieldErrors).length > 0) {
		return {
			ok: false,
			fieldErrors,
		};
	}

	return {
		ok: true,
		request: {
			username,
			fullName,
			country,
		},
	};
}

function toErrorResponse(error: unknown): Response {
	if (isApiHttpStatusError(error, 409)) {
		return Response.json(
			{
				ok: false,
				fieldErrors: {
					username: "Username is already in use.",
				},
				message: "Username is already in use.",
			} satisfies UpdateAccountSettingsResult,
			{ status: 409 },
		);
	}

	return toRouteErrorResponse(error, {
		authenticationMessage: "Session expired. Please sign in again.",
		createBody: createAccountErrorBody,
		message: "Unable to update account settings right now. Please try again.",
	});
}

export async function GET(): Promise<Response> {
	try {
		return Response.json(await getAccountSettings());
	} catch (error) {
		return toRouteErrorResponse(error, {
			authenticationMessage: "Session expired. Please sign in again.",
			message: "Unable to load account settings right now. Please try again.",
		});
	}
}

export async function PUT(request: Request): Promise<Response> {
	const parsedBody = await parseJsonRequestBody<UpdateAccountSettingsBody>(
		request,
		{
			createBody: createAccountErrorBody,
		},
	);
	if (!parsedBody.ok) {
		return parsedBody.response;
	}

	const validation = validateUpdateAccountSettingsBody(parsedBody.body);
	if (!validation.ok || !validation.request) {
		return Response.json(validation, { status: 400 });
	}

	try {
		const account = await updateAccountSettings(validation.request);
		return Response.json({
			account,
			ok: true,
		} satisfies UpdateAccountSettingsResult);
	} catch (error) {
		return toErrorResponse(error);
	}
}
