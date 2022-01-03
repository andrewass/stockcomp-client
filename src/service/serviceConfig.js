import {ApolloClient, InMemoryCache} from "@apollo/client";

const BASE_URL = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const graphqlClient = new ApolloClient({
    uri: BASE_URL+"/graphql",
    cache: new InMemoryCache()
});

export {
    BASE_URL, graphqlClient
}