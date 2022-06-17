
export interface StockPrice{
    symbol: string
    name: string
    price: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number
}

export interface StockQuote{
    price: number
    priceChange: number
    percentageChange: number
    currency: string
    usdPrice: number
}


export interface StockDetails {
    symbol: string
    description: string
    stockQuote: StockQuote
}