import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import {
  CompleteEmailVerificationResponse,
  CompleteEmailVerificationMutationArgs
} from '../../../types/graph';
import Verification from '../../../entities/Verification';

/**
 * Resolvers
 *
 * CompleteEmailVerification
 * @desc Check verified key from Email
 */
const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const email = `${user.email}`;
        const { key } = args;

        // No Eamil
        if (!email) {
          return {
            ok: false,
            error: 'Your user has no eamil to verify'
          };
        }

        try {
          const verification = await Verification.findOne({
            key,
            payload: email
          });

          if (verification) {
            user.verifiedEmail = true;
            user.save();

            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: 'Cant verify email'
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
