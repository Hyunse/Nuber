import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:400/graphql'
});

export default client;