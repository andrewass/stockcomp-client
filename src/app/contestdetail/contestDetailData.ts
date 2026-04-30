import "server-only";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import {
	isUnauthenticatedError,
	resourceGet,
} from "@/api/resourceServerClient.ts";
import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
} from "@/domain/contests/contestParticipantTypes.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";

export interface ContestDetailPageData {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
}

async function getContest(contestId: number): Promise<Contest> {
	return resourceGet<Contest>({
		url: `/contests/${contestId}`,
	});
}

async function getContestLeaderboard(
	contestId: number,
	pageNumber: number,
	pageSize: number,
): Promise<ContestLeaderboardPage> {
	return resourceGet<ContestLeaderboardPage>({
		url: "/participants/sorted",
		params: { contestId, pageNumber, pageSize },
	});
}

async function getParticipantDetailForContest(
	contestId: number,
): Promise<ContestParticipantDetail | null> {
	try {
		return await resourceGet<ContestParticipantDetail>({
			url: `/participants/detailed/contest/${contestId}`,
		});
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			throw error;
		}

		if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}

export async function getContestDetailPageData(
	contestId: number,
	pageNumber: number,
	pageSize: number,
): Promise<ContestDetailPageData | null> {
	try {
		const [contest, leaderboard, participantDetail] = await Promise.all([
			getContest(contestId),
			getContestLeaderboard(contestId, pageNumber, pageSize),
			getParticipantDetailForContest(contestId),
		]);

		return {
			contest,
			leaderboard,
			participantDetail,
		};
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
