export const ORDER_STATUS = {
	ACTIVE: "ACTIVE",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	TERMINATED: "TERMINATED",
};

const TRANSACTION_TYPE = {
	SELL: "SELL",
	BUY: "BUY",
};

export const codeMapTransaction = new Map<string, string>([
	["Buy", TRANSACTION_TYPE.BUY],
	["Sell", TRANSACTION_TYPE.SELL],
]);

export type InvestmentOrder = {
	acceptedPrice: number;
	remainingAmount: number;
	totalAmount: number;
	orderId: number;
	symbol: string;
	transactionType: string;
	currency: string;
	expirationTime: number;
};

export type InvestmentOrderRequest = {
	acceptedPrice: number;
	expirationTime: string;
	amount: number;
	transactionType: string;
	currency: string;
	participantId: number;
	symbol: string;
};
