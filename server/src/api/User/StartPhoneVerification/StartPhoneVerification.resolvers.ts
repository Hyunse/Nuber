import { Resolvers } from '../../../types/resolvers';
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from '../../../types/graph';
import Verification from '../../../entities/Verification';
import { sendVerificationSMS } from '../../../utils/sendSMS';

/**
 * Resovlers
 *
 * StartPhoneVerification
 * @desc Send SMS For Phone Verfication
 */
const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      // PhoneNumber is a number that we get from client
      const { phoneNumber } = args;

      try {
        // Find Verification By Phonenumber
        const existingVerfication = await Verification.findOne({
          payload: phoneNumber
        });

        // If Existing Verification
        if (existingVerfication) {
          existingVerfication.remove();
        }

        // Create New Verification By Phonenumber
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE'
        }).save();

        // Send Verification SMS
        await sendVerificationSMS(newVerification.payload, newVerification.key);

        // Return
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
