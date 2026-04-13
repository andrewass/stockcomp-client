import type { Contest } from "@/contest/contestTypes.ts";

export interface ContestLeaderboardParticipant {
	participantId: number;
	username: string;
	rank?: number;
	totalValue: number;
	totalInvestmentValue: number;
	remainingFunds: number;
	country?: string;
}

export interface ContestLeaderboardPage {
	participants: ContestLeaderboardParticipant[];
	totalEntriesCount: number;
}

export interface ContestParticipantDetail {
	contest: Contest;
	participant: ContestLeaderboardParticipant;
}
