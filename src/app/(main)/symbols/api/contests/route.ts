import {
	getRegisteredContests,
	getUnregisteredContests,
	signUpParticipant,
} from "@/symbols/api/contestsData.ts";

export async function GET(): Promise<Response> {
	const [unregisteredContests, registeredContests] = await Promise.all([
		getUnregisteredContests(),
		getRegisteredContests(),
	]);

	return Response.json({
		registeredContests,
		unregisteredContests,
	});
}

export async function POST(request: Request): Promise<Response> {
	const body = (await request.json()) as { contestId?: unknown };
	const contestId = body.contestId;

	if (typeof contestId !== "number" || !Number.isInteger(contestId)) {
		return Response.json(
			{ message: "contestId must be an integer." },
			{ status: 400 },
		);
	}

	await signUpParticipant(contestId);

	return new Response(null, { status: 204 });
}
