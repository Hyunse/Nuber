import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';

/**
 * Resolvers
 * 
 * GetMyProfile
 * @desc Get My profile
 */
const resolvers: Resolvers = {
  Query: {
    GetMyProfile: privateResolver(async (_, __, { req }) => {
      // User from context
      const { user } = req;

      // Return User
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};

export default resolvers;
