import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";

export async function getUnregisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<Contest[]>({
		url: "/participants/unregistered",
	});
	return mapToSymbolContestListItemViewModel(contests);
}

export async function getRegisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<Contest[]>({
		url: "/participants/registered",
	});
	return mapToSymbolContestListItemViewModel(contests);
}

function mapToSymbolContestListItemViewModel(
	contests: Contest[],
): SymbolContestListItemViewModel[] {
	return contests.map((contest) => ({
		contestId: contest.contestId,
		contestName: contest.contestName,
		contestStatus: contest.contestStatus,
		startTime: contest.startTime,
		endTime: contest.endTime,
	}));
}
