import { DateTime } from 'luxon';
import { Db } from 'mongodb';
import { v4 as uuid } from 'uuid';

import formatters from '../formatters.js';
import assert from '../assert.js';
import {
  MutationMigrateMessagesArgs,
  Mutation,
  QueryMessagesArgs,
  MutationCreateRoomArgs,
  QueryUsersArgs,
  MutationSendMessageArgs,
  Message,
  Room,
  User,
} from '../types/types.js';
import { Context } from '../types/context.js';

export default (db: Db) => {
  const Messages = db.collection<Message>('messages');
  const Rooms = db.collection<Room>('rooms');
  const Users = db.collection<User>('users');

  return {
    Query: {
      messages: async (_, args: QueryMessagesArgs, context: Context) => {
        if (args.limit > 100) {
          return new Error('max limit is 100');
        }

        await assert.userHasAccessToGroup(args.roomId, Users, context);

        const messages = await Messages.find({
          roomId: args.roomId,
          ...(args.interval && {
            timestamp: {
              $gte: args.interval.from,
              $lte: args.interval.to,
            },
          }),
        })
          .sort({ timestamp: -1 })
          .limit(args.limit)
          .toArray();

        // Converts epoch milliseconds to ISO format
        messages.map(m => ({ ...m, timestampISO: DateTime.fromMillis(m.timestamp).toISO() }));

        return messages.reverse();
      },
      rooms: async (_, args, context: Context) => {
        const { userId } = context.user;
        const user = await Users.findOne({ userId });

        return Rooms.find({ roomId: { $in: user.rooms } }).toArray();
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      users: async (_, args: QueryUsersArgs) => {
        // return Users.find()
      },
      // room: async (_, args: QueryRoomArgs) => Rooms.findOne(args),
    },
    Mutation: {
      migrateMessages: async (_, args: MutationMigrateMessagesArgs): Promise<Mutation['migrateMessages']> => {
        const formattedMessages = args.messages.map(fbMessage => formatters.fbMessageToMessage(fbMessage));

        await Messages.insertMany(formattedMessages);

        return formattedMessages;
      },
      createRoom: async (_, args: MutationCreateRoomArgs, context: Context): Promise<Mutation['createRoom']> => {
        const { userId } = context.user;
        const roomId = uuid();
        const room = { name: args.name, users: [{ userId }], roomId };

        await Rooms.insertOne(room);
        await Users.updateOne({ userId }, { $push: { rooms: roomId } });
        return room;
      },
      sendMessage: async (_, args: MutationSendMessageArgs, context: Context): Promise<Mutation['sendMessage']> => {
        const message: Message = {
          ...args.message,
          sender: context.user.userId,
          timestamp: Date.now(),
        };

        await Messages.insertOne(message);

        return message;
      },
    },
  };
};
