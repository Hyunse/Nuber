import { GraphQLServer, PubSub } from 'graphql-yoga';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import schema from './schema';
import decodeJWT from './utils/decodeJWT';
import { NextFunction, Response } from 'express';

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    // Subscribtion Server from Graphql-yoga
    // it's Demo version
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    // Graphql Server
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        // req.connection is WebSocket Connection
        // req.connection.context has currentUser from index.ts
        const { connection: { context = null } = {} } = req;

        return {
          req: req.request,
          // PubSub is Publish & Subscription Server
          pubSub: this.pubSub,
          // Attach Connection Context to Resolver Context
          context
        };
      }
    });

    this.middlewares();
  }

  // Middlewares
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger('dev'));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  // JWT Middleware
  private jwt = async (
    req,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get('X-JWT');

    if (token) {
      const user = await decodeJWT(token);

      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }

    next();
  };
}

export default new App().app;
