export const ORDER_STATUS = {
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	TERMINATED: "TERMINATED",
} as const;

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
