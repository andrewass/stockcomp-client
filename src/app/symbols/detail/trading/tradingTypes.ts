import type { CreateInvestmentOrderRequest } from "@/domain/investmentorder/investmentOrderTypes.ts";

export interface SymbolTradingOrderRequest
	extends CreateInvestmentOrderRequest {
	contestId: number;
}
