import {ApolloClient, InMemoryCache} from "@apollo/client";

const CONTEST_BASE_URL = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;
const STOCK_BASE_URL = process.env.REACT_APP_STOCK_QUOTE_BASE_URL;


const graphqlClient = new ApolloClient({
    uri: STOCK_BASE_URL+"/graphql",
    cache: new InMemoryCache()
});

export {
    CONTEST_BASE_URL, STOCK_BASE_URL, graphqlClient
}