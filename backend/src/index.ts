import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { config } from 'dotenv';
import restApi from './rest-api.js';

import typeDefs from './type-defs.js';
import resolvers from './resolvers/resolvers.js';
import connect from './db.js';
import auth from './auth.js';
import { Context } from './types/context.js';

await config();

await restApi.start();

const messengerDB = await connect();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers(messengerDB),
});

const port = +process.env.GRAPHQL_PORT;

const { url } = await startStandaloneServer(apolloServer, {
  listen: { port },
  context: async ({ req }): Promise<Context> => {
    const payload = await auth(req);
    return { user: { ...payload, userId: payload.sub } };
  },
});

console.log(`Apollo Server running on port ${port} | ${url}`);
