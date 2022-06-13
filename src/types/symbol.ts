
export interface StockQuote{
    price: number
    currency: string
}

export interface StockSymbol{
    symbol: string
    name: string
    price: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number
}