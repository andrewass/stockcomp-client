import {Contest} from "../contests/contestTypes";
import {Investment} from "../../investment/investmentTypes";
import {InvestmentOrder} from "../investmentorder/investmentOrderTypes";

export type Participant = {
    participantId: number
    username: string
    rank?: number
    totalValue: number
    totalInvestmentValue: number
    remainingFunds: number
    contestNumber: number
    contestName: string
    country?: string
}

export type ContestParticipant = {
    participant: Participant,
    contest: Contest
}

export type DetailedParticipant = {
    participant: Participant,
    investments: Investment[]
}

export type CompleteParticipant = {
    participant: Participant,
    investments: Investment[],
    activeOrders: InvestmentOrder[],
    completedOrders: InvestmentOrder[]
}

export type ParticipantPage = {
    participants: Participant[]
    totalEntriesCount: number
}
