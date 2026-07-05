import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import {
	isUnauthenticatedError,
	resourceGet,
} from "@/api/resourceServerClient.ts";
import { auth } from "@/lib/auth.ts";

export type ViewerAdminRoleStatus =
	| "admin"
	| "not-admin"
	| "unauthenticated"
	| "unavailable";

export class ViewerAdminRoleUnavailableError extends Error {
	constructor() {
		super("Unable to verify viewer admin role.");
		this.name = "ViewerAdminRoleUnavailableError";
	}
}

export function isViewerAdminRoleUnavailableError(
	error: unknown,
): error is ViewerAdminRoleUnavailableError {
	return error instanceof ViewerAdminRoleUnavailableError;
}

function normalizeReturnTo(returnTo?: string): string {
	if (!returnTo?.startsWith("/") || returnTo.startsWith("//")) {
		return "/";
	}

	if (returnTo.startsWith("/signin")) {
		return "/";
	}

	return returnTo;
}

function redirectToSignIn(returnTo?: string): never {
	redirect(
		`/signin?returnTo=${encodeURIComponent(normalizeReturnTo(returnTo))}`,
	);
}

export const getViewerSession = cache(async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
});

export async function requireViewerSession(returnTo?: string) {
	const session = await getViewerSession();
	if (!session) {
		redirectToSignIn(returnTo);
	}

	return session;
}

const getVerifiedViewerAdminRoleStatus = cache(
	async (): Promise<Exclude<ViewerAdminRoleStatus, "unavailable">> => {
		const session = await getViewerSession();
		if (!session) {
			return "unauthenticated";
		}

		try {
			const hasAdminRole = await resourceGet<boolean>({
				url: "/account/admin",
			});
			return hasAdminRole ? "admin" : "not-admin";
		} catch (error) {
			if (isUnauthenticatedError(error)) {
				return "unauthenticated";
			}

			if (isApiHttpStatusError(error, 403)) {
				return "not-admin";
			}

			throw new ViewerAdminRoleUnavailableError();
		}
	},
);

export const getViewerAdminRoleStatus = cache(
	async (): Promise<ViewerAdminRoleStatus> => {
		try {
			return await getVerifiedViewerAdminRoleStatus();
		} catch (error) {
			if (isViewerAdminRoleUnavailableError(error)) {
				return "unavailable";
			}

			throw error;
		}
	},
);

export async function requireViewerAdminRole(returnTo?: string): Promise<void> {
	await requireViewerSession(returnTo);

	const adminRoleStatus = await getVerifiedViewerAdminRoleStatus();
	if (adminRoleStatus === "admin") {
		return;
	}

	if (adminRoleStatus === "unauthenticated") {
		redirectToSignIn(returnTo);
	}

	redirect("/");
}
