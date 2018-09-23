import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from '../../../types/graph';
import User from '../../../entities/User';
import cleanNullArgs from '../../../utils/clearnNullArg';

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        // Check null variable
        const notNull: any = cleanNullArgs(args);

        // Update Password
        if (notNull.password !== null) {
          user.password = notNull.password;
          user.save();
          delete notNull.password;
        }

        try {
          await User.update({ id: user.id }, { ...notNull });
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
