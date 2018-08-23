import { SayHelloQueryArgs, sayHelloResponse } from '../../../types/graph';

const resolvers = {
  Query: {
    sayHello: (_, args: SayHelloQueryArgs): sayHelloResponse => {
      return {
        error: false,
        text: `Hi ${args.name}`
      };
    }
  }
};

export default resolvers;
