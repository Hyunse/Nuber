import { gql } from 'apollo-boost';

/**
 * Check Logged In
 */
export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
