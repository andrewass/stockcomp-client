export type SymbolCardViewModel = {
	symbol: string;
	companyName: string;
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
};

export type SymbolFinancialsViewModel = {
	marketCap: number;
	priceToBook: number;
	priceToEarnings: number;
	earningsPerShare: number;
	dividendRate: number | null;
	dividendYieldPercentage: number | null;
};

export type SymbolPriceHistoryPoint = {
	price: number;
	priceDate: string;
};

export type SymbolDetailViewModel = {
	symbol: string;
	companyName: string;
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
	usdPrice: number | null;
	financials: SymbolFinancialsViewModel;
	history: SymbolPriceHistoryPoint[];
};

export type SymbolContestListItemViewModel = {
	contestId: number;
	contestName: string;
	contestStatus: string;
	startTime: string;
	endTime: string;
};
