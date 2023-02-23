import {StockQuote, StockStats} from "../symboldetails/symbolDetailTypes";



export interface Stock{
    symbol: string,
    description: string,
    stockQuote: StockQuote,
    stockStats?: StockStats
}
