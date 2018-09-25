import { Resolvers } from '../../../types/resolvers';
import privateResolver from '../../../utils/privateResolver';
import User from '../../../entities/User';
import { GetNearByDriversResponse } from '../../../types/graph';
import { Between, getRepository } from 'typeorm';

/**
 * Resolvers
 * 
 * GetNearByDrivers
 * @desc Get Drivers who are close ( lat, lng +- 0.05)
 */
const resolvers: Resolvers = {
  Query: {
    GetNearByDrivers: privateResolver(
      async (_, __, { req }): Promise<GetNearByDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;

        try {
          // Get Repository is Data Mapper. ( I'm using Active Record)
          // Between Function works in getRepository
          // So, in this code, we should cal User by getRepository
          const drivers: User[] = await getRepository(User).find({
            isDriving: true,
            lastLat: Between(lastLat - 0.05, lastLat + 0.05),
            lastLng: Between(lastLng - 0.05, lastLat + 0.05)
          });

          // Return Drivers
          return {
            ok: true,
            error: null,
            drivers
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null
          }
        }
      }
    )
  }
};

export default resolvers;