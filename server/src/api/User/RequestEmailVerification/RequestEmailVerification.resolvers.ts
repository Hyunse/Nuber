import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import Verification from '../../../entities/Verification';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import { RequestEmailVerificationResponse } from '../../../types/graph';

/**
 * Resolvers
 *
 * RequestEmailVerification
 * @desc Send Verification Email
 */
const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        const email = `${user.email}`;

        // No Eamil || Aleardy Verify Eamil
        if (!email || user.verifiedEmail) {
          return {
            ok: false,
            error: 'Your user has no eamil to verify'
          };
        }

        try {
          // Find Old Verification By Eamil
          const oldVerification = await Verification.findOne({
            payload: email
          });

          // Remove Old Verification
          if (oldVerification) {
            oldVerification.remove();
          }

          // Create & Save New Verification
          const newVerification = await Verification.create({
            payload: email,
            target: 'EMAIL'
          }).save();

          // Send Email
          await sendVerificationEmail(user.fullName, newVerification.key);

          // Return
          return {
            ok: true,
            error: null
          };
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
