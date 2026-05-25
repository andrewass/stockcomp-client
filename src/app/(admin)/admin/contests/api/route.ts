import { createContest } from "@/admin/contests/create/createContestData.ts";
import type { CreateContestResult } from "@/admin/contests/create/createContestTypes.ts";
import { updateContest } from "@/admin/contests/update/updateContestData.ts";
import type { UpdateContestResult } from "@/admin/contests/update/updateContestTypes.ts";
import { isUnauthenticatedError } from "@/api/resourceServerClient.ts";
import {
	CONTEST_STATUS,
	type CreateContestRequest,
	type UpdateContestRequest,
} from "@/domain/contests/contestTypes.ts";

interface CreateContestBody {
	contestName?: unknown;
	startTime?: unknown;
	durationDays?: unknown;
}

interface UpdateContestBody {
	contestId?: unknown;
	contestName?: unknown;
	startTime?: unknown;
	contestStatus?: unknown;
}

function validateCreateContestBody(
	body: CreateContestBody,
): CreateContestResult & { request?: CreateContestRequest } {
	const contestName =
		typeof body.contestName === "string" ? body.contestName.trim() : "";
	const startTime = typeof body.startTime === "string" ? body.startTime : "";
	const durationDays =
		typeof body.durationDays === "number" ? body.durationDays : Number.NaN;
	const fieldErrors: Record<string, string> = {};

	if (!contestName) {
		fieldErrors.contestName = "Contest name is required.";
	}

	if (!Number.isInteger(durationDays) || durationDays < 1) {
		fieldErrors.durationDays = "Duration must be at least 1 day.";
	}

	const startDate = new Date(startTime);
	if (Number.isNaN(startDate.getTime())) {
		fieldErrors.startTime = "Start time is invalid.";
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
			contestName,
			durationDays,
			startTime: startDate.toISOString(),
		},
	};
}

function validateUpdateContestBody(
	body: UpdateContestBody,
): UpdateContestResult & { request?: UpdateContestRequest } {
	const contestId =
		typeof body.contestId === "number" ? body.contestId : Number.NaN;
	const contestName =
		typeof body.contestName === "string" ? body.contestName.trim() : "";
	const startTime = typeof body.startTime === "string" ? body.startTime : "";
	const contestStatus =
		typeof body.contestStatus === "string" ? body.contestStatus : "";
	const fieldErrors: Record<string, string> = {};

	if (!Number.isInteger(contestId) || contestId < 1) {
		fieldErrors.contestId = "Contest ID is required.";
	}

	if (!contestName) {
		fieldErrors.contestName = "Contest name is required.";
	}

	const startDate = new Date(startTime);
	if (Number.isNaN(startDate.getTime())) {
		fieldErrors.startTime = "Start time is invalid.";
	}

	if (!Object.values(CONTEST_STATUS).includes(contestStatus)) {
		fieldErrors.contestStatus = "Contest status is invalid.";
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
			contestId,
			contestName,
			contestStatus,
			startTime: startDate.toISOString(),
		},
	};
}

function toErrorResponse(
	error: unknown,
	action: "create" | "update",
): Response {
	if (isUnauthenticatedError(error)) {
		return Response.json(
			{
				ok: false,
				message: "Session expired. Please sign in again.",
			} satisfies CreateContestResult,
			{ status: 401 },
		);
	}

	return Response.json(
		{
			ok: false,
			message: `Unable to ${action} contest right now. Please try again.`,
		} satisfies CreateContestResult,
		{ status: 502 },
	);
}

export async function POST(request: Request): Promise<Response> {
	let body: CreateContestBody;
	try {
		body = (await request.json()) as CreateContestBody;
	} catch {
		return Response.json(
			{
				ok: false,
				message: "Invalid JSON body.",
			} satisfies CreateContestResult,
			{ status: 400 },
		);
	}

	const validation = validateCreateContestBody(body);
	if (!validation.ok || !validation.request) {
		return Response.json(validation, { status: 400 });
	}

	try {
		await createContest(validation.request);

		return Response.json({ ok: true } satisfies CreateContestResult, {
			status: 201,
		});
	} catch (error) {
		return toErrorResponse(error, "create");
	}
}

export async function PATCH(request: Request): Promise<Response> {
	let body: UpdateContestBody;
	try {
		body = (await request.json()) as UpdateContestBody;
	} catch {
		return Response.json(
			{
				ok: false,
				message: "Invalid JSON body.",
			} satisfies UpdateContestResult,
			{ status: 400 },
		);
	}

	const validation = validateUpdateContestBody(body);
	if (!validation.ok || !validation.request) {
		return Response.json(validation, { status: 400 });
	}

	try {
		await updateContest(validation.request);

		return Response.json({ ok: true } satisfies UpdateContestResult);
	} catch (error) {
		return toErrorResponse(error, "update");
	}
}
