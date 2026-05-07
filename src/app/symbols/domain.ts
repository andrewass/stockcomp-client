export type SymbolCardViewModel = {
	symbol: string;
	companyName: string;
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
};

export type SymbolContestListItemViewModel = {
	contestId: number;
	contestName: string;
	contestStatus: string;
	startTime: string;
	endTime: string;
};
