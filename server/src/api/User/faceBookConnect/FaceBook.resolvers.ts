import { Resolvers } from '../../../types/resolvers';
import {
  FaceBookConnectMutationArgs,
  FaceBookConnectResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

/**
 * Resolvers
 * FaceBookConnect
 */
const resolvers: Resolvers = {
  Mutation: {
    FaceBookConnect: async (
      _,
      args: FaceBookConnectMutationArgs
    ): Promise<FaceBookConnectResponse> => {
      const { fbId } = args;
      try {
        // Find User in DB
        const existingUser = await User.findOne({ fbId });

        // Is First To Register?
        if (existingUser) {
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

      // Register New User
      try {
        // Create User in DB
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();

        // Create JWT
        const token = createJWT(newUser.id);

        // Return Success
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        // Return Error
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
