import "server-only";
import { resourcePost } from "@/api/resourceServerClient.ts";
import type { CreateContestRequest } from "@/domain/contests/contestTypes.ts";

export async function createContest(
	input: CreateContestRequest,
): Promise<void> {
	const contestName = input.contestName.trim();
	const startDate = new Date(input.startTime);

	await resourcePost<void>({
		url: "/contests/create",
		body: {
			contestName,
			durationDays: input.durationDays,
			startTime: startDate.toISOString(),
		} satisfies CreateContestRequest,
	});
}
