import "server-only";
import {
	type Contest,
	type ContestPage,
	type ContestStatus,
	isContestStatus,
} from "@/domain/contests/contestTypes.ts";

export interface ContestDto {
	contestId: number;
	contestName: string;
	startTime: string;
	endTime: string;
	contestStatus: unknown;
	participantCount?: number;
}

export interface ContestPageDto {
	contests: ContestDto[];
	totalEntriesCount: number;
}

export function mapContestStatus(value: unknown): ContestStatus {
	if (isContestStatus(value)) {
		return value;
	}

	throw new Error("Unknown contest status returned by resource server.");
}

export function mapContestDto(contest: ContestDto): Contest {
	return {
		...contest,
		contestStatus: mapContestStatus(contest.contestStatus),
	};
}

export function mapContestPageDto(page: ContestPageDto): ContestPage {
	return {
		contests: page.contests.map(mapContestDto),
		totalEntriesCount: page.totalEntriesCount,
	};
}
