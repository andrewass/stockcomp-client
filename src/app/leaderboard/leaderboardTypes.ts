export enum MedalValue {
	Gold = "Gold",
	Silver = "Silver",
	Bronze = "Bronze",
}

export interface Medal {
	medalValue: MedalValue;
	position: number;
}

export interface LeaderboardUserDetailsDto {
	userId: number;
	username: string;
	fullName?: string | null;
	country?: string | null;
}

export interface LeaderboardEntryDto {
	ranking: number;
	score: number;
	contestCount: number;
	medals: Medal[];
	userDetails: LeaderboardUserDetailsDto;
}

export interface LeaderboardEntryPageDto {
	entries: LeaderboardEntryDto[];
	totalEntriesCount: number;
}

export interface LeaderboardEntry {
	userId: number;
	username: string;
	country: string | null;
	displayName: string;
	ranking: number;
	score: number;
	contestCount: number;
	medals: Medal[];
}

export interface LeaderboardEntryPage {
	entries: LeaderboardEntry[];
	totalEntriesCount: number;
}
