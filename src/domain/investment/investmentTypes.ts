export type Investment = {
	investmentId: number;
	symbol: string;
	amount: number;
	totalProfit: number;
	totalValue: number;
};

export interface SymbolInvestmentSummary {
	symbol: string;
	amount: number;
	totalCost: number;
	totalProfit: number;
	totalProfitPercentage: number;
	totalValue: number;
}
