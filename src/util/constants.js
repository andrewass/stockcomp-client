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

const contestStatusMap = new Map([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
]);

const codeMapTransaction = new Map([
    ["Buy", TRANSACTION_TYPE.BUY],
    ["Sell", TRANSACTION_TYPE.SELL]
]);

export {
    CONTEST_STATUS, ORDER_STATUS, TRANSACTION_TYPE, contestStatusMap, codeMapTransaction
}

