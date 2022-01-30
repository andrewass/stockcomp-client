import {ApolloClient, InMemoryCache} from "@apollo/client";

const OAUTH2_REDIRECT_URL = "http://localhost:3000/";

export const CONTEST_BASE_URL = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

export const STOCK_BASE_URL = process.env.REACT_APP_STOCK_QUOTE_BASE_URL;

export const GOOGLE_AUTH_URL = CONTEST_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URL;

export const graphqlClient = new ApolloClient({
    uri: STOCK_BASE_URL+"/graphql",
    cache: new InMemoryCache()
});
