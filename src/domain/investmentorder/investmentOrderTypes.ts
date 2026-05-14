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

export const codeMapTransaction = new Map<string, string>([
	["Buy", TRANSACTION_TYPE.BUY],
	["Sell", TRANSACTION_TYPE.SELL],
]);

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type TransactionType =
	(typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export interface InvestmentOrder {
	investmentOrderId: number;
	contestId: number;
	symbol: string;
	transactionType: TransactionType;
	amount: number;
	orderStatus: OrderStatus;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateInvestmentOrderRequest {
	contestId: number;
	symbol: string;
	transactionType: TransactionType;
	amount: number;
}
