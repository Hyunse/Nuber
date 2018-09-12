import { Resolvers } from '../../../types/resolvers';
import {
  FaceBookConnectMutationArgs,
  FacebookConnectResponse
} from '../../../types/graph';

const resolvers: Resolvers = {
  Mutation: {
    FaceBookConnect: (_, args: FaceBookConnectMutationArgs) : Promise<FacebookConnectResponse> => ''
  }
};
export default resolvers;