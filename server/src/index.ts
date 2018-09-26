// .env file
import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import app from './app';
import connectionOptions from './ormConfig';
import decodeJWT from './utils/decodeJWT';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = '/playground';
const GRAPHQL_ENDPOINT: string = '/graphql';
const SUBSCRIPTION_ENDPOINT: string = '/subscription';

// App Option
const appOption: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    // Web Socket Connection
    onConnect: async (connectionParams) => {
      const token = connectionParams['X-JWT'];
      const user = await decodeJWT(token);

      // Set CurrentUser on Req Connection Context
      if (token) {
        return {
          currentUser: user
        };
      }

      throw new Error(`No JWT. Cant't subscribe`);
    }
  }
};

const handleAppStart = () => console.log(`Listening on ${PORT}`);

// Connect Typeorm And then App Start
createConnection(connectionOptions)
  .then(() => {
    app.start(appOption, handleAppStart);
  })
  .catch((error) => console.log(error));
