import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';

import App from './App';

const authLink = setContext(() => {
  const token = localStorage.getItem('tokenDummyApolloClient');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const httpLink = createHttpLink({
  uri: 'https://merng-server-gliga.herokuapp.com/',
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
