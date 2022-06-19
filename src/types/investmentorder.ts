
export interface InvestmentOrder {
    acceptedPrice: number
    remainingAmount: number
    totalAmount: number
    orderId: number
    symbol: string
    transactionType: string
    currency: string
    expirationTime: number
}