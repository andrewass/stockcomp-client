import { CONTEST_STATUS } from "@/contest/contestTypes.ts";
import type {
	SymbolCardViewModel,
	SymbolContestListItemViewModel,
} from "@/symbols/symbolTypes.ts";

export const trendingSymbols: SymbolCardViewModel[] = [
	{
		symbol: "NVDA",
		companyName: "NVIDIA Corporation",
		currentPrice: 942.51,
		priceChange: 19.48,
		percentageChange: 2.11,
		currency: "USD",
	},
	{
		symbol: "AAPL",
		companyName: "Apple Inc.",
		currentPrice: 196.22,
		priceChange: -1.84,
		percentageChange: -0.93,
		currency: "USD",
	},
	{
		symbol: "MSFT",
		companyName: "Microsoft Corporation",
		currentPrice: 427.96,
		priceChange: 4.12,
		percentageChange: 0.97,
		currency: "USD",
	},
	{
		symbol: "TSLA",
		companyName: "Tesla, Inc.",
		currentPrice: 171.64,
		priceChange: -6.37,
		percentageChange: -3.58,
		currency: "USD",
	},
	{
		symbol: "AMZN",
		companyName: "Amazon.com, Inc.",
		currentPrice: 182.75,
		priceChange: 1.21,
		percentageChange: 0.67,
		currency: "USD",
	},
	{
		symbol: "META",
		companyName: "Meta Platforms, Inc.",
		currentPrice: 503.28,
		priceChange: 0,
		percentageChange: 0,
		currency: "USD",
	},
	{
		symbol: "EQNR",
		companyName: "Equinor ASA",
		currentPrice: 287.6,
		priceChange: 4.85,
		percentageChange: 1.72,
		currency: "NOK",
	},
	{
		symbol: "NOVO-B",
		companyName: "Novo Nordisk A/S",
		currentPrice: 912.4,
		priceChange: -8.7,
		percentageChange: -0.94,
		currency: "DKK",
	},
	{
		symbol: "SAP",
		companyName: "SAP SE",
		currentPrice: 176.18,
		priceChange: 2.54,
		percentageChange: 1.46,
		currency: "EUR",
	},
];

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
