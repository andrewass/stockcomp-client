const CONTEST_STATUS = {
    AWAITING_START: "AWAITING_START",
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    COMPLETED: "COMPLETED"
}

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

const contestStatusMap = new Map<string, string>([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
])

const codeMapTransaction = new Map<string, string>([
    ["Buy", TRANSACTION_TYPE.BUY],
    ["Sell", TRANSACTION_TYPE.SELL]
])

const FETCH_QUOTE_INTERVAL = 5000

export {
    CONTEST_STATUS, ORDER_STATUS, TRANSACTION_TYPE,
    FETCH_QUOTE_INTERVAL, contestStatusMap, codeMapTransaction,
}

