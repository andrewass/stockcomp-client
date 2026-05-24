export enum MedalValue {
	Gold = "Gold",
	Silver = "Silver",
	Bronze = "Bronze",
}

export interface Medal {
	medalValue: MedalValue;
	position: number;
}

export interface LeaderboardEntry {
	country: string;
	displayName: string;
	ranking: number;
	score: number;
	medals: Medal[];
}

export interface LeaderboardEntryPage {
	entries: LeaderboardEntry[];
	totalEntriesCount: number;
}
