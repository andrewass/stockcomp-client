import {
	parseJsonRequestBody,
	toRouteErrorResponse,
} from "@/api/routeHandlerResponses.ts";
import {
	getRegisteredContests,
	getUnregisteredContests,
	signUpParticipant,
} from "@/symbols/overview/contests/contestsData.ts";

interface SignUpContestBody {
	contestId?: unknown;
}

function toContestListErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to load contests.",
	});
}

function toContestSignUpErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to sign up for this contest.",
	});
}

export async function GET(): Promise<Response> {
	try {
		const [unregisteredContests, registeredContests] = await Promise.all([
			getUnregisteredContests(),
			getRegisteredContests(),
		]);

		return Response.json({
			registeredContests,
			unregisteredContests,
		});
	} catch (error) {
		return toContestListErrorResponse(error);
	}
}

export async function POST(request: Request): Promise<Response> {
	const parsedBody = await parseJsonRequestBody<SignUpContestBody>(request);
	if (!parsedBody.ok) {
		return parsedBody.response;
	}

	const contestId = parsedBody.body.contestId;

	if (typeof contestId !== "number" || !Number.isInteger(contestId)) {
		return Response.json(
			{ message: "contestId must be an integer." },
			{ status: 400 },
		);
	}

	try {
		await signUpParticipant(contestId);

		return new Response(null, { status: 204 });
	} catch (error) {
		return toContestSignUpErrorResponse(error);
	}
}
