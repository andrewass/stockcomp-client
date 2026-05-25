import "server-only";
import { resourcePatch } from "@/api/resourceServerClient.ts";
import type {
	Contest,
	UpdateContestRequest,
} from "@/domain/contests/contestTypes.ts";

export async function updateContest(
	input: UpdateContestRequest,
): Promise<void> {
	const body: Record<string, unknown> = {
		contestId: input.contestId,
	};

	if (input.contestName !== undefined) {
		body.contestName = input.contestName.trim();
	}

	if (input.contestStatus !== undefined) {
		body.contestStatus = input.contestStatus;
	}

	if (input.startTime !== undefined) {
		body.startTime = new Date(input.startTime).toISOString();
	}

	await resourcePatch<Contest>({
		url: "/contests/update",
		body,
	});
}
