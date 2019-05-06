import { Resolvers } from '../../../types/resolvers';
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

/**
 * Resolvers
 * 
 * EmailSignIn
 * @desc Sign in by Eamil
 */
const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;

      try {
        // Find User By Email
        const user = await User.findOne({ email });

        // User doesn't exist
        if (!user) {
          return {
            ok: false,
            error: 'No User with that email',
            token: null
          };
        }
        
        // Check Password
        const checkPassword = await user.comparePassword(password);

        if(checkPassword) {
          // Create JWT
          const token = createJWT(user.id);
          
          // Return JWT
          return {
            ok: true,
            error: null,
            token
          }
        } else {
          return {
            ok: false,
            error: 'Worong password',
            token: null
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
