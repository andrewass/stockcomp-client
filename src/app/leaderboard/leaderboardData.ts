import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type { LeaderboardEntryPage } from "@/leaderboard/leaderboardTypes.ts";

export async function getLeaderboardEntries(
	pageNumber: number,
	pageSize: number,
): Promise<LeaderboardEntryPage> {
	return resourceGet<LeaderboardEntryPage>({
		url: "/leaderboard/sorted",
		params: { pageNumber, pageSize },
	});
}
