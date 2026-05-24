import type { Contest } from "@/domain/contests/contestTypes.ts";
import type { TransactionType } from "@/domain/investmentorder/investmentOrderTypes.ts";

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
	participant: ContestParticipantSummary;
	investments: ContestParticipantInvestment[];
	activeOrders: ContestParticipantInvestmentOrder[];
	completedOrders: ContestParticipantInvestmentOrder[];
}

export interface ContestParticipantSummary {
	participantId: number;
	userId: number;
	rank?: number | null;
	totalValue: number;
	totalInvestmentValue: number;
	remainingFunds: number;
}

export interface ContestParticipantInvestment {
	symbol: string;
	amount: number;
	averageUnitCost: number;
	totalProfit: number;
	totalValue: number;
}

export interface ContestParticipantInvestmentOrder {
	orderId: number | null;
	symbol: string;
	totalAmount: number;
	remainingAmount: number;
	acceptedPrice: number;
	currency: string;
	expirationTime: string;
	transactionType: TransactionType;
	orderStatus: string;
}
