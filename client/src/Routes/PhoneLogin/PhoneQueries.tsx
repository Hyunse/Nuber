import { gql } from 'apollo-boost';

/**
 * Phone Sign In
 * 
 * @param {string} phoneNumber
 */
export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;