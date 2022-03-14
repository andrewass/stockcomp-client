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

const decodeMap = new Map([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
]);

const codeMap = new Map([
    ["Buy", TRANSACTION_TYPE.BUY],
    ["Sell", TRANSACTION_TYPE.SELL]
]);


export {
    CONTEST_STATUS, ORDER_STATUS, TRANSACTION_TYPE, decodeMap, codeMap
}

