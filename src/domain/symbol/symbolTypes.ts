export type StockPrice = {
	currentPrice: number;
	previousClose: number;
	currency: string;
	symbol: string;
	companyName: string;
};

export type StockFinancials = {
	symbol: string;
	companyName: string;
	currency: string;
	marketCap: number;
	priceToBook: number;
	priceToEarnings: number;
	earningsPerShare: number;
	dividendRate?: number | null;
	dividendYieldPercentage?: number | null;
};

export type HistoricalPrice = {
	price: number;
	price_date: string;
};

export enum Period {
	DAY1 = "1d",
	DAY5 = "5d",
	MONTH1 = "1mo",
	MONTH3 = "3mo",
	MONTH6 = "6mo",
	YEAR1 = "1y",
	YEAR2 = "2y",
	YEAR5 = "5y",
	YEAR10 = "10y",
	THIS_YEAR = "ytd",
	MAX = "max",
}
