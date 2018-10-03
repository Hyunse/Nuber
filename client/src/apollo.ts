import ApolloClient, { Operation } from 'apollo-boost';

const client = new ApolloClient({
  clientState: {
    // Default State
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggendIn: Boolean(localStorage.getItem('jwt'))
      }
    },
    resolvers: {
      Mutation: {
        /**
         * logUserIn
         * 
         * @param _
         * @param token : JWT
         * @param cache
         */
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem('jwt', token);
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggendIn: false
              }
            }
          });
          return null;
        },
        /**
         * logUserOut
         * 
         * @param cache
         */
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem('jwt');
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggendIn: false
              }
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      // Default Header
      headers: {
        // JWT
        'X-JWT': localStorage.getItem('jwt') || ''
      }
    });
  },
  // EndPoint
  uri: 'http://localhost:400/graphql'
});

export default client;
