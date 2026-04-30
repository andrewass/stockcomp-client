export type Participant = {
    participantId: number;
    username: string;
    rank?: number;
    totalValue: number;
    totalInvestmentValue: number;
    remainingFunds: number;
    country?: string;
};

