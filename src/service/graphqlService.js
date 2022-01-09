import {gql} from "@apollo/client";

const GET_STOCK_QUOTE = gql`
        query GetStockQuote($symbol: String!) {
            stockQuote(symbol: $symbol) {
                symbol
                price
                currency
                previousClose
            }
        }
    `;

const GET_STOCK_STATS = gql`
        query GetStockSymbolStats($symbol: String!) {
            stockSymbolStats(symbol: $symbol) {
                symbol
                stockQuote {
                    price
                    previousClose
                    currency
                    usdPrice
                }
                stockStats {
                    priceToEarnings
                }
            }
        }
    `;

export {
    GET_STOCK_QUOTE, GET_STOCK_STATS
}
