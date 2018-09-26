import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import {
  ReportMovementMutationArgs,
  ReportMovementResponse
} from '../../../types/graph';
import cleanNullArgs from '../../../utils/clearnNullArg';
import User from '../../../entities/User';

/**
 * Resolvers
 *
 * ReportMovement
 * @desc
 */
const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);

        try {
          await User.update({ id: user.id }, { ...notNull });
          
          // Publish Driver info
          pubSub.publish('driverUpdate', { DriversSubscription: user });

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
