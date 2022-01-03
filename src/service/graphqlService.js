import {gql} from "@apollo/client";

const GET_STOCK_QUOTE = gql`
        query GetStockQuote($symbol: String!) {
            stockQuote(symbol: $symbol) {
                symbol
            }
        }
    `;

export {
    GET_STOCK_QUOTE
}
