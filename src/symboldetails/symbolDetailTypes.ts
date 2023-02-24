
export interface Stock{
    symbol: string,
    description: string,
    stockQuote: StockQuote,
    stockStats?: StockStats
}

export interface StockQuote{
    price: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number
}


export interface StockStats{
    annualDividendYieldPercent: number
    earningsPerShare: number,
    marketCap: number,
    priceToBook: number,
    priceToEarnings: number,
    revenue: number,
    sharesOwned: number,
    shortRatio: number
}

export interface HistoricalQuote{
    price: number,
    quoteDate: number,
    volume: number
}