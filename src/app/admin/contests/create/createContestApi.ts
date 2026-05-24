import type { CreateContestRequest } from "@/domain/contests/contestTypes.ts";
import type { CreateContestResult } from "./createContestTypes.ts";

export async function createContest(
	request: CreateContestRequest,
): Promise<CreateContestResult> {
	const response = await fetch("/admin/contests/api", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	const result = (await response
		.json()
		.catch(() => null)) as CreateContestResult | null;

	if (result) {
		return result;
	}

	if (!response.ok) {
		return {
			ok: false,
			message: "Unable to create contest right now. Please try again.",
		};
	}

	return { ok: true };
}
