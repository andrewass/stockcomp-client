import {StockQuote, StockStats} from "../symboldetails/symbolDetailTypes";


export type Contest = {
    contestNumber: number
    startTime: Date
    endTime: Date
    participantCount: number
    contestStatus: string
}

export interface Stock{
    symbol: string,
    description: string,
    stockQuote: StockQuote,
    stockStats?: StockStats
}
