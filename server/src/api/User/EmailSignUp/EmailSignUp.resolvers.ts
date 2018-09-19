import { Resolvers } from '../../../types/resolvers';
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';
import Verification from '../../../entities/Verification';
import { sendVerificationEmail } from '../../../utils/sendEmail';

/**
 * Resolvers
 *
 * EmailSignUp
 * @desc Sign up By Eamil
 */
const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;

      try {
        // Find User By Email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // Exist User
          return {
            ok: false,
            error: 'You should log in instead',
            token: null
          };
        } else {
          // No Exist User
          
          // Verify Phonenumber
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true
          });

          if (phoneVerification) {
            // PhoneVerification == True
            // Create New User
            const newUser = await User.create({ ...args }).save();
            // Create JWT
            const token = createJWT(newUser.id);

            // S - Email Verification
            // Verify Eamil
            const emailVerification = await Verification.create({
              payload: `${newUser.email}`,
              target: 'EMAIL'
            });

            // Send Email
            await sendVerificationEmail(
              newUser.fullName,
              emailVerification.key
            );
            // E - Email Verification

            // Return JWT
            return {
              ok: true,
              error: null,
              token
            };
          } else {
            // PhoneVerification == false
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            };
          }
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
