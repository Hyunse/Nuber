import { Resolvers } from '../../../types/resolvers';
import {
  FaceBookConnectMutationArgs,
  FaceBookConnectResponse
} from '../../../types/graph';
import User from '../../../entities/User';

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
          return {
            ok: true,
            error: null,
            token: 'Comming soon'
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      // Register New User
      try {
        // Create User in DB
        await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();

        return {
          ok: true,
          error: null,
          token: 'Coming soon'
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
