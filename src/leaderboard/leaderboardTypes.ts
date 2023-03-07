
export enum MedalValue {
    Gold,
    Silver,
    Bronze,
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