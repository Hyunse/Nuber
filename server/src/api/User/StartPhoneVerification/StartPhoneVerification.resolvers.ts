import { Resolvers } from '../../../types/resolvers';
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from '../../../types/graph';
import Verification from '../../../entities/Verification';
import { sendVerificationSMS } from '../../../utils/sendSMS';

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      // PhoneNumber is a number that we get from client
      const { phoneNumber } = args;
      
      try {
        // Find PhoneNumber 
        const existingVerfication = await Verification.findOne({
          payload: phoneNumber
        });

        if (existingVerfication) {
          existingVerfication.remove();
        }

        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: 'PHONE'
        }).save();

        // Send SMS
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
