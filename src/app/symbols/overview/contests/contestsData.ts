import "server-only";
import { resourceGet, resourcePost } from "@/api/resourceServerClient.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";

type ContestListResponseItem = Contest | { contest: Contest };

export async function getUnregisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<ContestListResponseItem[]>({
		url: "/participants/unregistered",
	});
	return mapToSymbolContestListItemViewModel(contests);
}

export async function getRegisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<ContestListResponseItem[]>({
		url: "/participants/registered",
	});
	return mapToSymbolContestListItemViewModel(contests);
}

export async function signUpParticipant(contestId: number): Promise<void> {
	await resourcePost<void>({
		url: "/participants/sign-up",
		body: {
			contestId,
		} satisfies SignUpParticipantRequest,
	});
}

function mapToSymbolContestListItemViewModel(
	contests: ContestListResponseItem[],
): SymbolContestListItemViewModel[] {
	return contests.map((item) => {
		const contest = "contest" in item ? item.contest : item;

		return {
			contestId: contest.contestId,
			contestName: contest.contestName,
			contestStatus: contest.contestStatus,
			startTime: contest.startTime,
			endTime: contest.endTime,
		};
	});
}

type SignUpParticipantRequest = {
	contestId: number;
};
