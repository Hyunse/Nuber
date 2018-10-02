import ApolloClient, { Operation } from 'apollo-boost';

const client = new ApolloClient({
  request: async(operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem('jwt') || ''
      }
    })
  },
  uri: 'http://localhost:400/graphql'
});

export default client;