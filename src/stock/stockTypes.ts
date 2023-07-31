
export type StockPrice = {
    currentPrice: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number,
    symbol: string,
    companyName: string
}

export type StockFinancials = {
    symbol: string,
    companyName: string,
    currency: string,
    marketCap:number,
    priceToBook: number,
    priceToEarnings: number,
    earningsPerShare: number,
    dividendRate?: number,
    dividendYieldPercentage?: number,
}

export type HistoricalPrice = {
    price: number,
    date: number
}

export type HistoricalPrices = {
    symbol: string,
    historicalPriceList: HistoricalPrice[]
}
