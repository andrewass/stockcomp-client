import type { Investment } from "../../investment/investmentTypes";
import type { Contest } from "../contests/contestTypes";
import type { InvestmentOrder } from "../investmentorder/investmentOrderTypes";

export type Participant = {
	participantId: number;
	username: string;
	rank?: number;
	totalValue: number;
	totalInvestmentValue: number;
	remainingFunds: number;
	country?: string;
};

export type ContestParticipant = {
	participant: Participant;
	contest: Contest;
};

export type DetailedParticipant = {
	contest: Contest;
	participant: Participant;
	investments: Investment[];
	activeOrders: InvestmentOrder[];
	completedOrders: InvestmentOrder[];
};

export type ParticipantPage = {
	participants: Participant[];
	totalEntriesCount: number;
};
