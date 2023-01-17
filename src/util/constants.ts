

const ORDER_STATUS = {
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    TERMINATED: "TERMINATED"
}

const TRANSACTION_TYPE = {
    SELL: "SELL",
    BUY: "BUY"
}

const codeMapTransaction = new Map<string, string>([
    ["Buy", TRANSACTION_TYPE.BUY],
    ["Sell", TRANSACTION_TYPE.SELL]
])

const FETCH_QUOTE_INTERVAL = 5000

export {
    ORDER_STATUS, TRANSACTION_TYPE,
    FETCH_QUOTE_INTERVAL, codeMapTransaction,
}

