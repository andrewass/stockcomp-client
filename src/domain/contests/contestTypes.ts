export const CONTEST_STATUS = {
	AWAITING_START: "AWAITING_START",
	RUNNING: "RUNNING",
	STOPPED: "STOPPED",
	AWAITING_COMPLETION: "AWAITING_COMPLETION",
	COMPLETED: "COMPLETED",
} as const;

export type ContestStatus =
	(typeof CONTEST_STATUS)[keyof typeof CONTEST_STATUS];

export const CONTEST_STATUSES: readonly ContestStatus[] =
	Object.values(CONTEST_STATUS);

export function isContestStatus(value: unknown): value is ContestStatus {
	return (
		typeof value === "string" &&
		(CONTEST_STATUSES as readonly string[]).includes(value)
	);
}

export const LEADERBOARD_UPDATE_STATUS = {
	AWAITING: "AWAITING",
	COMPLETED: "COMPLETED",
};

export const leaderboardUpdateStatusMap = new Map<string, string>([
	[LEADERBOARD_UPDATE_STATUS.AWAITING, "Awaiting"],
	[LEADERBOARD_UPDATE_STATUS.COMPLETED, "Completed"],
]);

export const contestStatusRecord: Record<ContestStatus, string> = {
	[CONTEST_STATUS.AWAITING_START]: "Awaiting Start",
	[CONTEST_STATUS.RUNNING]: "Running",
	[CONTEST_STATUS.STOPPED]: "Stopped",
	[CONTEST_STATUS.AWAITING_COMPLETION]: "Awaiting Completion",
	[CONTEST_STATUS.COMPLETED]: "Completed",
};

export interface Contest {
	contestId: number;
	contestName: string;
	startTime: string;
	endTime: string;
	contestStatus: ContestStatus;
	participantCount?: number;
}

export function getStatusByColor(contest: Contest): string {
	switch (contest.contestStatus) {
		case CONTEST_STATUS.RUNNING:
			return "green";
		case CONTEST_STATUS.COMPLETED:
			return "grey";
		case CONTEST_STATUS.AWAITING_COMPLETION:
			return "yellow";
		case CONTEST_STATUS.AWAITING_START:
			return "yellow";
		case CONTEST_STATUS.STOPPED:
			return "red";
		default:
			console.error(`Invalid contest status ${contest.contestStatus}`);
	}
	return "red";
}

export interface ContestPage {
	contests: Contest[];
	totalEntriesCount: number;
}

export interface UpdateContestRequest {
	contestId: number;
	contestName?: string;
	startTime?: string;
	contestStatus?: ContestStatus;
}

export interface CreateContestRequest {
	startTime: string;
	contestName: string;
	durationDays: number;
}
