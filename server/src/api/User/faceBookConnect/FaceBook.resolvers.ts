import { Resolvers } from '../../../types/resolvers';
import {
  FaceBookConnectMutationArgs,
  FaceBookConnectResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

/**
 * Resolvers
 *
 * FaceBookConnect
 * @desc SignIn or SignUp By Facebook ID
 */
const resolvers: Resolvers = {
  Mutation: {
    FaceBookConnect: async (
      _,
      args: FaceBookConnectMutationArgs
    ): Promise<FaceBookConnectResponse> => {
      const { fbId } = args;
      try {
        // Find User By Facebook ID
        const existingUser = await User.findOne({ fbId });
        console.log(args);
        if (existingUser) {
          // Exist User

          // Create JWT
          const token = createJWT(existingUser.id);

          // Return Success
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        // Return Error
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      console.log(args);
      // No Exist User -> Register New USer
      try {
        // Create New User
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();

        // Create JWT
        const token = createJWT(newUser.id);

        // Return JWT
        return {
          ok: true,
          error: null,
          token
        };
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
