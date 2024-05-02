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
    contestNumber: number = NaN;
    startTime: string = "";
    endTime: Date = new Date();
    participantCount: number = NaN;
    contestStatus: string = "";
    leaderboardUpdateStatus: string = "";

    constructor(fields: Contest) {
        Object.assign(this, fields);
    }

    getStatusByColor(): string {
        switch (this.contestStatus) {
            case CONTEST_STATUS.RUNNING :
                return "green";
            case CONTEST_STATUS.COMPLETED :
                return "grey";
            case CONTEST_STATUS.AWAITING_START :
                return "yellow";
            case CONTEST_STATUS.STOPPED :
                return "red";
            default:
                console.error("Invalid contest status " + this.contestStatus);
        }
        return "red";
    }
}

export type ContestPage = {
    contests: Contest[]
    totalEntriesCount: number
}

export type UpdateContestInput = {
    contestNumber: number,
    startTime: string,
    contestStatus: string,
}

export type CreateContestInput = {
    contestNumber: number
    startTime: string
    contestName: string
}