export const CONTEST_STATUS = {
    AWAITING_START: "AWAITING_START",
    RUNNING: "RUNNING",
    STOPPED: "STOPPED",
    COMPLETED: "COMPLETED"
}

export const LEADERBOARD_UPDATE_STATUS = {
    AWAITING: "AWAITING",
    COMPLETED: "COMPLETED"
}

export const leaderboardUpdateStatusMap = new Map<string, string>([
    [LEADERBOARD_UPDATE_STATUS.AWAITING, "Awaiting"],
    [LEADERBOARD_UPDATE_STATUS.COMPLETED, "Completed"]
])

export const contestStatusMap = new Map<string, string>([
    [CONTEST_STATUS.AWAITING_START, "Awaiting Start"],
    [CONTEST_STATUS.RUNNING, "Running"],
    [CONTEST_STATUS.STOPPED, "Stopped"],
    [CONTEST_STATUS.COMPLETED, "Completed"]
])

export class Contest {
    contestNumber: number;
    startTime: string;
    endTime: Date;
    participantCount: number;
    contestStatus: string;
    leaderboardUpdateStatus: string;

    constructor(
        contestNumber: number,
        startTime: string,
        endTime: Date,
        participantCount: number,
        contestStatus: string,
        leaderboardUpdateStatus: string
    ) {
        this.contestNumber = contestNumber;
        this.startTime = startTime;
        this.endTime = endTime;
        this.participantCount = participantCount;
        this.contestStatus = contestStatus
        this.leaderboardUpdateStatus = leaderboardUpdateStatus
    }
}

export type ContestPage = {
    contests: Contest[]
    totalEntriesCount: number
}