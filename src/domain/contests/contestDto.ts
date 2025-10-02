export type UpdateContestRequest = {
	contestId: number;
	contestName: string;
	startTime: string;
	contestStatus: string;
};

export type CreateContestRequest = {
	startTime: string;
	contestName: string;
	durationDays: number;
};
