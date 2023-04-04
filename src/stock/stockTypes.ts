
export type Stock = {
    symbol: string,
    description: string,
    stockQuote: StockQuote,
    stockStats?: StockStats
}

export type StockQuote = {
    price: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number
}


export type StockStats = {
    annualDividendYieldPercent: number
    earningsPerShare: number,
    marketCap: number,
    priceToBook: number,
    priceToEarnings: number,
    revenue: number,
    sharesOwned: number,
    shortRatio: number
}

export type HistoricalQuote = {
    price: number,
    quoteDate: number
}