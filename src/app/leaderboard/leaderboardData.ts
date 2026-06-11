import "server-only";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type {
	LeaderboardEntry,
	LeaderboardEntryDto,
	LeaderboardEntryPage,
	LeaderboardEntryPageDto,
} from "@/leaderboard/leaderboardTypes.ts";

function mapLeaderboardEntry(dto: LeaderboardEntryDto): LeaderboardEntry {
	const displayName =
		dto.userDetails.fullName?.trim() || dto.userDetails.username;

	return {
		userId: dto.userDetails.userId,
		username: dto.userDetails.username,
		country: dto.userDetails.country ?? null,
		displayName,
		ranking: dto.ranking,
		score: dto.score,
		contestCount: dto.contestCount,
		medals: dto.medals,
	};
}

function mapLeaderboardEntryPage(
	dto: LeaderboardEntryPageDto,
): LeaderboardEntryPage {
	return {
		entries: dto.entries.map(mapLeaderboardEntry),
		totalEntriesCount: dto.totalEntriesCount,
	};
}

export async function getLeaderboardEntries(
	pageNumber: number,
	pageSize: number,
): Promise<LeaderboardEntryPage> {
	const response = await resourceGet<LeaderboardEntryPageDto>({
		url: "/leaderboard/sorted",
		params: { pageNumber, pageSize },
	});

	return mapLeaderboardEntryPage(response);
}

export async function getCurrentUserLeaderboardEntry(): Promise<LeaderboardEntry | null> {
	try {
		const response = await resourceGet<LeaderboardEntryDto>({
			url: "/leaderboard/user",
		});

		return mapLeaderboardEntry(response);
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
