import type { ContestStatus } from "@/domain/contests/contestTypes.ts";
import type { InvestmentOrderStatus } from "@/domain/investmentorder/investmentOrderTypes.ts";

export interface SymbolCardViewModel {
	symbol: string;
	companyName: string;
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
}

export interface SymbolSearchResultViewModel {
	symbol: string;
	companyName: string;
}

export interface SymbolFinancialsViewModel {
	marketCap: number;
	priceToBook: number;
	priceToEarnings: number;
	earningsPerShare: number;
	dividendRate: number | null;
	dividendYieldPercentage: number | null;
}

export interface SymbolPriceHistoryPoint {
	price: number;
	priceDate: string;
}

export interface SymbolPriceHistoryChangeViewModel {
	amount: number;
	percentage: number;
}

export interface SymbolPriceHistoryViewModel {
	history: SymbolPriceHistoryPoint[];
	change: SymbolPriceHistoryChangeViewModel | null;
}

export interface SymbolDetailViewModel {
	symbol: string;
	companyName: string;
	currentPrice: number;
	priceChange: number;
	percentageChange: number;
	currency: string;
	usdPrice: number | null;
	financials: SymbolFinancialsViewModel;
	priceHistory: SymbolPriceHistoryViewModel;
}

export interface SymbolContestListItemViewModel {
	contestId: number;
	contestName: string;
	contestStatus: ContestStatus;
	startTime: string;
	endTime: string;
	investmentStatus?: SymbolContestInvestmentStatusViewModel;
}

export interface SymbolContestInvestmentStatusViewModel {
	remainingFunds: number;
	totalInvestmentValue: number;
	totalProfit: number;
	totalValue: number;
	rank: number | null;
}

export interface SymbolTradingOrderViewModel {
	investmentOrderId: number | null;
	transactionType: "BUY" | "SELL";
	totalAmount: number;
	remainingAmount: number;
	acceptedPrice: number;
	currency: string;
	orderStatus: InvestmentOrderStatus;
	expirationTime: string;
}

export interface SymbolTradingInvestmentViewModel {
	amount: number;
	totalCost: number;
	totalProfit: number;
	totalProfitPercentage: number;
	totalValue: number;
}

export interface SymbolTradingContestViewModel {
	contestId: number;
	participantId: number;
	contestName: string;
	contestStatus: ContestStatus;
	startTime: string;
	endTime: string;
	remainingFunds: number;
	investment: SymbolTradingInvestmentViewModel;
	orders: SymbolTradingOrderViewModel[];
}

export interface SymbolTradingViewModel {
	symbol: string;
	contests: SymbolTradingContestViewModel[];
}
