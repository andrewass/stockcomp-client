export type StockPrice = {
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
	usdPrice: number;
	symbol: string;
	companyName: string;
};

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

export type StockFinancials = {
	symbol: string;
	companyName: string;
	currency: string;
	marketCap: number;
	priceToBook: number;
	priceToEarnings: number;
	earningsPerShare: number;
	dividendRate?: number;
	dividendYieldPercentage?: number;
};

export type HistoricalPrice = {
	price: number;
	price_date: number;
};

export enum Period {
	MONTH1 = "MONTH1",
	MONTH6 = "MONTH6",
	THIS_YEAR = "THIS_YEAR",
	YEAR1 = "YEAR1",
	YEAR5 = "YEAR5",
	MAX = "MAX",
}
