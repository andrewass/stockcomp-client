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

const decodeMap = new Map([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
]);


export {
    CONTEST_STATUS, ORDER_STATUS, decodeMap
}

