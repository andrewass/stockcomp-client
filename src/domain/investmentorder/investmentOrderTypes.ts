export const ORDER_STATUS = {
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	TERMINATED: "TERMINATED",
} as const;

export type InvestmentOrderStatus =
	(typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const INVESTMENT_ORDER_STATUSES: readonly InvestmentOrderStatus[] =
	Object.values(ORDER_STATUS);

export function isInvestmentOrderStatus(
	value: unknown,
): value is InvestmentOrderStatus {
	return (
		typeof value === "string" &&
		(INVESTMENT_ORDER_STATUSES as readonly string[]).includes(value)
	);
}

export const TRANSACTION_TYPE = {
	SELL: "SELL",
	BUY: "BUY",
} as const;

export type TransactionType =
	(typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export interface CreateInvestmentOrderRequest {
	participantId: number;
	symbol: string;
	transactionType: TransactionType;
	totalAmount: number;
	currency: string;
	acceptedPrice: number;
	expirationTime: string;
}
