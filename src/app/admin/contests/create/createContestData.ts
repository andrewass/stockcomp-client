import "server-only";
import { resourcePost } from "@/api/resourceServerClient.ts";
import type { CreateContestRequest } from "@/domain/contests/contestTypes.ts";

export async function createContest(
	input: CreateContestRequest,
): Promise<void> {
	const contestName = input.contestName.trim();

	await resourcePost<void>({
		url: "/contests",
		body: {
			contestName,
			durationDays: input.durationDays,
			startTime: input.startTime,
		} satisfies CreateContestRequest,
	});
}
