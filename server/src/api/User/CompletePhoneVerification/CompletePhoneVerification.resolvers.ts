import { Resolvers } from '../../../types/resolvers';
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from '../../../types/graph';
import Verification from '../../../entities/Verification';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

/**
 * Resolvers
 * 
 * Complete Phone Verification
 * @desc Complete Phone Verification
 */
const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;

      try {
        // Find Phonenumber
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });

        // No Exist
        if (!verification) {
          return {
            ok: false,
            error: 'Verification key no valid',
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      // Exist Phonenumber
      try {
        // Find User By Phonenumber
        const user = await User.findOne({ phoneNumber });

        if (user) {
          user.verifiedPhoneNumber = true;
          user.save();
          
          // Create JWT
          const token = createJWT(user.id);

          // Return JWT
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          // Verificated number But User doen't exit
          return {
            ok: true,
            error: null,
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
