import { createContest } from "@/admin/contests/create/createContestData.ts";
import type { CreateContestResult } from "@/admin/contests/create/createContestTypes.ts";
import { updateContest } from "@/admin/contests/update/updateContestData.ts";
import type { UpdateContestResult } from "@/admin/contests/update/updateContestTypes.ts";
import { resourceGet } from "@/api/resourceServerClient.ts";
import {
	parseJsonRequestBody,
	toRouteErrorResponse,
} from "@/api/routeHandlerResponses.ts";
import {
	CONTEST_STATUS,
	type Contest,
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
	const fieldErrors: Record<string, string> = {};
	const updateRequest: UpdateContestRequest = {
		contestId,
	};

	if (!Number.isInteger(contestId) || contestId < 1) {
		fieldErrors.contestId = "Contest ID is required.";
	}

	if (body.contestName != null) {
		const contestName =
			typeof body.contestName === "string" ? body.contestName.trim() : "";
		if (!contestName) {
			fieldErrors.contestName = "Contest name is required.";
		} else {
			updateRequest.contestName = contestName;
		}
	}

	if (body.startTime != null) {
		const startTime = typeof body.startTime === "string" ? body.startTime : "";
		const startDate = new Date(startTime);
		if (Number.isNaN(startDate.getTime())) {
			fieldErrors.startTime = "Start time is invalid.";
		} else {
			updateRequest.startTime = startDate.toISOString();
		}
	}

	if (body.contestStatus != null) {
		const contestStatus =
			typeof body.contestStatus === "string" ? body.contestStatus : "";
		if (!Object.values(CONTEST_STATUS).includes(contestStatus)) {
			fieldErrors.contestStatus = "Contest status is invalid.";
		} else {
			updateRequest.contestStatus = contestStatus;
		}
	}

	if (Object.keys(fieldErrors).length > 0) {
		return {
			ok: false,
			fieldErrors,
		};
	}

	return {
		ok: true,
		request: updateRequest,
	};
}

function createAdminContestErrorBody(
	message: string,
): CreateContestResult & UpdateContestResult {
	return {
		ok: false,
		message,
	};
}

function toErrorResponse(
	error: unknown,
	action: "create" | "update",
): Response {
	return toRouteErrorResponse(error, {
		authenticationMessage: "Session expired. Please sign in again.",
		createBody: createAdminContestErrorBody,
		message: `Unable to ${action} contest right now. Please try again.`,
	});
}

async function assertContestCanBeUpdated(
	contestId: number,
): Promise<Response | null> {
	const contest = await resourceGet<Contest>({
		url: `/contests/${contestId}`,
	});

	if (contest.contestStatus === CONTEST_STATUS.COMPLETED) {
		return Response.json(
			{
				ok: false,
				message: "Completed contests cannot be updated.",
			} satisfies UpdateContestResult,
			{ status: 409 },
		);
	}

	return null;
}

export async function POST(request: Request): Promise<Response> {
	const parsedBody = await parseJsonRequestBody<CreateContestBody>(request, {
		createBody: createAdminContestErrorBody,
	});
	if (!parsedBody.ok) {
		return parsedBody.response;
	}

	const validation = validateCreateContestBody(parsedBody.body);
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
	const parsedBody = await parseJsonRequestBody<UpdateContestBody>(request, {
		createBody: createAdminContestErrorBody,
	});
	if (!parsedBody.ok) {
		return parsedBody.response;
	}

	const validation = validateUpdateContestBody(parsedBody.body);
	if (!validation.ok || !validation.request) {
		return Response.json(validation, { status: 400 });
	}

	try {
		const conflictResponse = await assertContestCanBeUpdated(
			validation.request.contestId,
		);
		if (conflictResponse) {
			return conflictResponse;
		}

		await updateContest(validation.request);

		return Response.json({ ok: true } satisfies UpdateContestResult);
	} catch (error) {
		return toErrorResponse(error, "update");
	}
}
