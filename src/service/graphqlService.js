import {useQuery} from "react-query";
import {graphqlClient} from "./serviceConfig";
import {gql} from "graphql-request";


export const useGetSymbolStats = (symbol) => {
    return useQuery(["getSymbolStats", symbol], async () => {
        return await graphqlClient.request(
            gql`
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
    `, {symbol});
    });
}

