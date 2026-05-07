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
