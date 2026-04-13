"use server";

import { apiGet, isUnauthenticatedError } from "@/api/apiWrapper.ts";
import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
} from "@/contest/contestParticipantTypes.ts";
import type { Contest } from "@/contest/contestTypes.ts";

export interface ContestDetailPageData {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
}

function isHttpStatusError(error: unknown, status: number): boolean {
	return error instanceof Error && error.message.includes(`status: ${status}`);
}

async function getContest(contestId: number): Promise<Contest> {
	return apiGet<Contest>({
		url: `/contests/${contestId}`,
	});
}

async function getContestLeaderboard(
	contestId: number,
	pageNumber: number,
	pageSize: number,
): Promise<ContestLeaderboardPage> {
	return apiGet<ContestLeaderboardPage>({
		url: "/participants/sorted",
		params: { contestId, pageNumber, pageSize },
	});
}

async function getParticipantDetailForContest(
	contestId: number,
): Promise<ContestParticipantDetail | null> {
	try {
		return await apiGet<ContestParticipantDetail>({
			url: `/participants/detailed/contest/${contestId}`,
		});
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			throw error;
		}

		if (isHttpStatusError(error, 400) || isHttpStatusError(error, 404)) {
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
		if (isHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
