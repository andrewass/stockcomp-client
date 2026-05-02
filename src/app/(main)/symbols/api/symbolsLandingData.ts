import { CONTEST_STATUS } from "@/domain/contests/contestTypes.ts";
import { SymbolContestListItemViewModel } from "@/domain/symbol/symbolTypes.ts";

export const signedUpContests: SymbolContestListItemViewModel[] = [
	{
		contestId: 14,
		contestName: "Nordic Momentum Sprint",
		contestStatus: CONTEST_STATUS.RUNNING,
		startTime: "2026-04-15T09:00:00Z",
		endTime: "2026-04-29T15:00:00Z",
	},
	{
		contestId: 18,
		contestName: "US Mega Cap Showdown",
		contestStatus: CONTEST_STATUS.AWAITING_START,
		startTime: "2026-04-19T13:30:00Z",
		endTime: "2026-05-03T20:00:00Z",
	},
];

export const openSignUpContests: SymbolContestListItemViewModel[] = [
	{
		contestId: 21,
		contestName: "AI Leaders Weekly",
		contestStatus: CONTEST_STATUS.AWAITING_START,
		startTime: "2026-04-20T13:30:00Z",
		endTime: "2026-04-27T20:00:00Z",
	},
	{
		contestId: 24,
		contestName: "Dividend Defenders",
		contestStatus: CONTEST_STATUS.AWAITING_START,
		startTime: "2026-04-22T08:00:00Z",
		endTime: "2026-05-06T15:00:00Z",
	},
	{
		contestId: 29,
		contestName: "Volatility Breakout Cup",
		contestStatus: CONTEST_STATUS.AWAITING_START,
		startTime: "2026-04-24T12:00:00Z",
		endTime: "2026-05-01T19:00:00Z",
	},
];
