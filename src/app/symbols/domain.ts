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

export type SymbolTradingOrderViewModel = {
	investmentOrderId: number | null;
	transactionType: "BUY" | "SELL";
	totalAmount: number;
	remainingAmount: number;
	acceptedPrice: number;
	currency: string;
	orderStatus: string;
	expirationTime: string;
};

export type SymbolTradingContestViewModel = {
	contestId: number;
	participantId: number;
	contestName: string;
	contestStatus: string;
	startTime: string;
	endTime: string;
	remainingFunds: number;
	investment: {
		amount: number;
		totalCost: number;
		totalProfit: number;
		totalProfitPercentage: number;
		totalValue: number;
	};
	orders: SymbolTradingOrderViewModel[];
};

export type SymbolTradingViewModel = {
	symbol: string;
	contests: SymbolTradingContestViewModel[];
};
