"use server";

import { apiGet, apiPost, isUnauthenticatedError } from "@/api/apiWrapper.ts";
import type {
	ContestPage,
	CreateContestRequest,
} from "@/contest/contestTypes.ts";

export interface CreateContestActionResult {
	ok: boolean;
	message?: string;
	fieldErrors?: Record<string, string>;
}

export async function getAdminContests(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	return apiGet<ContestPage>({
		url: `/contests/all?pageNumber=${pageNumber}&pageSize=${pageSize}`,
	});
}

export async function createContestAction(
	input: CreateContestRequest,
): Promise<CreateContestActionResult> {
	const contestName = input.contestName.trim();
	const fieldErrors: Record<string, string> = {};

	if (!contestName) {
		fieldErrors.contestName = "Contest name is required.";
	}

	if (!Number.isInteger(input.durationDays) || input.durationDays < 1) {
		fieldErrors.durationDays = "Duration must be at least 1 day.";
	}

	const startDate = new Date(input.startTime);
	if (Number.isNaN(startDate.getTime())) {
		fieldErrors.startTime = "Start time is invalid.";
	}

	if (Object.keys(fieldErrors).length > 0) {
		return {
			ok: false,
			fieldErrors,
		};
	}

	try {
		await apiPost({
			url: "/contests/create",
			body: {
				contestName,
				durationDays: input.durationDays,
				startTime: startDate.toISOString(),
			} satisfies CreateContestRequest,
		});
		return { ok: true };
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			return {
				ok: false,
				message: "Session expired. Please sign in again.",
			};
		}

		return {
			ok: false,
			message: "Unable to create contest right now. Please try again.",
		};
	}
}
