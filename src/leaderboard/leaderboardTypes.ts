export enum MedalValue {
    Gold = "Gold",
    Silver = "Silver",
    Bronze = "Bronze",
}

export type Medal = {
    medalValue: MedalValue
    position: number
}

export type LeaderboardEntry = {
    country: string
    displayName: string
    ranking: number
    score: number
    medals: Medal[]
}

export type LeaderboardEntryPage = {
    entries: LeaderboardEntry[]
    totalEntriesCount: number
}