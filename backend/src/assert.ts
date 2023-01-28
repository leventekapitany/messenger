import { Collection } from 'mongodb';

import { GraphQLError } from 'graphql';
import { User } from './types/types.js';
import { Context } from './types/context.js';

async function userHasAccessToGroup(roomId: string, Users: Collection<User>, context: Context) {
  const user = await Users.findOne({ userId: context.user.userId });
  if (user.rooms.includes(roomId)) {
    return;
  }

  throw new GraphQLError('User has no access to room', {
    extensions: {
      code: 'UNAUTHORIZED',
      http: { status: 403 },
    },
  });
}

export default {
  userHasAccessToGroup,
};
