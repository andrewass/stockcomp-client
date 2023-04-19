import {Investment} from "../investment/investmentTypes";

export type Participant = {
    displayName: string
    rank: number
    totalValue: number
    totalInvestmentValue: number
    remainingFunds: number
    contestNumber: number
    country: string
}

export type DetailedParticipant = {
    participant: Participant,
    investments: Investment[]
}

export type ParticipantPage = {
    participants: Participant[]
    totalEntriesCount: number
}