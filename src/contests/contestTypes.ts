
export const CONTEST_STATUS = {
    AWAITING_START: "AWAITING_START",
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    COMPLETED: "COMPLETED"
}

export const contestStatusMap = new Map<string, string>([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
])

export type Contest = {
    contestNumber: number
    startTime: string
    endTime: Date
    participantCount: number
    contestStatus: string
    leaderboardUpdateStatus: string
}
