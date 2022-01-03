import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {graphqlClient} from "./service/serviceConfig";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={graphqlClient}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

