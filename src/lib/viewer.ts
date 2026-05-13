import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import {
	isUnauthenticatedError,
	resourceGet,
} from "@/api/resourceServerClient.ts";
import { auth } from "@/lib/auth.ts";

function normalizeReturnTo(returnTo?: string): string {
	if (!returnTo || !returnTo.startsWith("/") || returnTo.startsWith("//")) {
		return "/";
	}

	if (returnTo.startsWith("/signin")) {
		return "/";
	}

	return returnTo;
}

export const getViewerSession = cache(async () => {
	return auth.api.getSession({
		headers: await headers(),
	});
});

export async function requireViewerSession(returnTo?: string) {
	const session = await getViewerSession();
	if (!session) {
		redirect(
			`/signin?returnTo=${encodeURIComponent(normalizeReturnTo(returnTo))}`,
		);
	}

	return session;
}

export const getViewerHasAdminRole = cache(async (): Promise<boolean> => {
	const session = await getViewerSession();
	if (!session) {
		return false;
	}

	try {
		return await resourceGet<boolean>({ url: "/users/admin" });
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			return false;
		}

		return false;
	}
});
