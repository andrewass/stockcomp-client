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

export const contestStatusRecord: Record<string, string> = {
    [CONTEST_STATUS.AWAITING_START]: "Awaiting Start",
    [CONTEST_STATUS.RUNNING]: "Running",
    [CONTEST_STATUS.STOPPED]: "Stopped",
    [CONTEST_STATUS.COMPLETED]: "Completed"
}

export class Contest {
    contestId: number = NaN;
    contestName: string = "";
    startTime: string = "";
    endTime: string = "";
    contestStatus: string = "";
    leaderboardUpdateStatus: string = "";
    participantCount?: number;

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

export type CreateContestInput = {
    startTime: string
    contestName: string
    durationDays: number
}
